import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../supabaseClient";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
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
          .select("id, text, created_at, user_id")
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

  // Handle message submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;

    try {
      const { error } = await supabase
        .from("messages")
        .insert([{ text: newMessage.trim(), user_id: currentUser.id }]);

      if (error) throw error;
      setNewMessage("");
    } catch (error) {
      setError(error.message);
    }
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col justify-between h-full bg-gray-100 p-8 min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-6">Chat Room</h2>

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

      <div className="flex-1 overflow-auto p-4 bg-white rounded-lg shadow-lg max-h-[500px]">
        {messages.map((message) => {
          const isCurrentUser = message.user_id === currentUser?.id;
          return (
            <div
              key={message.id}
              className={`flex items-start mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md p-4 rounded-lg ${isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
              >
                <p className="break-words">{message.text}</p>
                <small
                  className={`block mt-2 text-xs ${isCurrentUser ? "text-blue-100" : "text-gray-500"}`}
                >
                  {new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </small>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!currentUser}
        />
        <button
          type="submit"
          disabled={!currentUser || !newMessage.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
