import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const FirstYear = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("year", 1); // Fetch notes for 1st year (adjust dynamically)

      if (error) console.error(error);
      else setNotes(data);

      setLoading(false);
    };

    fetchNotes();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
          >
            <h3 className="text-lg font-semibold">{note.title}</h3>
            <p className="text-sm text-gray-600">{note.description}</p>
            <div className="mt-4 flex space-x-4">
              <button className="bg-blue-500 text-white py-1 px-2 text-sm rounded-md hover:bg-blue-600">
                View Details
              </button>
              <a
                href={note.file_url}
                className="bg-green-500 text-white py-1 px-2 text-sm rounded-md hover:bg-green-600"
              >
                Download Notes
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirstYear;
