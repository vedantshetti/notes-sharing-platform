import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../supabaseClient";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);

  // Fetch current user
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setError(error.message);
        return;
      }
      setCurrentUser(data.user);
    };

    getCurrentUser();
    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Fetch messages and set up real-time updates
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("id, text, file_url, created_at, user_id")
          .order("created_at", { ascending: true });

        if (error) throw error;

        setMessages(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMessages();

    // Real-time subscription
    const messageChannel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, []);

  // Handle file uploads
  const uploadFile = async (file) => {
    const filePath = `${currentUser.id}/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("chat-files")
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    if (!data || !data.path) {
      throw new Error("File path missing in the upload response.");
    }

    const publicUrl = supabase.storage.from("chat-files").getPublicUrl(data.path).data.publicUrl;

    return publicUrl;
  };

  // Handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !selectedFile) return;

    let fileUrl = null;
    try {
      if (selectedFile) {
        fileUrl = await uploadFile(selectedFile);
      }

      const { error } = await supabase
        .from("messages")
        .insert([{ text: newMessage.trim(), user_id: currentUser.id, file_url: fileUrl }]);

      if (error) throw error;

      setNewMessage("");
      setSelectedFile(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
    {/* Sidebar (hidden on small screens) */}
    <div className="hidden lg:block lg:w-1/6 bg-white shadow-lg">
      {/* Sidebar content */}
    </div>
  
    {/* Chat Area */}
    <div className="flex flex-col justify-between flex-1 w-full lg:w-3/4 p-4 lg:p-8">
      
  
      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      )}
  
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span>{error}</span>
        </div>
      )}
  
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-lg max-h-[calc(100vh-200px)]">
        {messages.map((message) => {
          const isCurrentUser = message.user_id === currentUser?.id;
          return (
            <div
              key={message.id}
              className={`flex items-start mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg shadow-md ${
                  isCurrentUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {message.file_url && (
                  <div className="mb-2">
                    {/* Check if file is an image */}
                    {message.file_url.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                      <a href={message.file_url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={message.file_url}
                          alt="Shared content"
                          className="w-auto max-w-[200px] max-h-[200px] rounded-lg mb-2 shadow-md cursor-pointer"
                        />
                      </a>
                    ) : (
                      <a
                        href={message.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline text-sm"
                      >
                        Download File
                      </a>
                    )}
                  </div>
                )}
                <p className="break-words">{message.text}</p>
                <small
                  className={`block mt-2 text-xs ${isCurrentUser ? "text-blue-100" : "text-gray-500"}`}
                >
                  {new Date(message.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
  
      {/* Message input form */}
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-2 items-center">
  <input
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    placeholder="Type a message"
    className="flex-1 px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    disabled={!currentUser}
  />
  <input
    type="file"
    onChange={(e) => setSelectedFile(e.target.files[0])}
    className="px-4 py-2 border rounded-lg shadow-md"
  />
  <button
    type="submit"
    disabled={!currentUser || (!newMessage.trim() && !selectedFile)}
    className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    Send
  </button>
</form>

    </div>
  </div>
  
  );
};

export default Chat;
