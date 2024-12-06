import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const SubjectNotesFirstYear = () => {
  const { subjectName } = useParams(); // Capture subject name from URL
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
    
      try {
        const { data: notesData, error: notesError } = await supabase
          .from("notes")
          .select("id, title, file_url")
          .eq("subject_name", decodeURIComponent(subjectName))
          .eq("year_name", "Year 1")
          .eq("department_name", "General"); // Placeholder for first year

        if (notesError) {
          console.error("Error fetching notes:", notesError);
        } else {
          setNotes(notesData);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    
      setLoading(false);
    };
    
    fetchNotes();
  }, [subjectName]);

  if (loading) return <p>Loading notes...</p>;

  return (
    <div
      className="lg:ml-[250px] p-8"
      style={{
        minHeight: "100vh", // Full height of the screen
        backgroundColor: "#f9f9f9", // Light background
      }}
    >
      <h2 className="text-1.7xl font-bold mb-6">
        Notes for {decodeURIComponent(subjectName)} (Year 1)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
              style={{
                height: "150px", // Fixed height for uniformity
                boxShadow:
                  "0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)", // Enhanced shadow
                display: "flex", // Flexbox for centering text
                flexDirection: "column", // Arrange content vertically
                alignItems: "center", // Center content horizontally
                justifyContent: "center", // Center content vertically
                cursor: "pointer", // Indicate it's clickable
              }}
              onClick={() => window.open(note.file_url, "_blank")} // Open file URL when clicked
            >
              <h3 className="text-lg font-semibold text-center">{note.title}</h3>
            </div>
          ))
        ) : (
          <p>No notes available for this subject.</p>
        )}
      </div>
    </div>
  );
};

export default SubjectNotesFirstYear;
