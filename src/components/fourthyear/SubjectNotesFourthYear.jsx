import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const SubjectNotesFourthYear = () => {
  const { subjectName, departmentName } = useParams(); // Capture department and subject from URL
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);

      try {
        // Fetch notes based on subject name, year, and department
        const { data: notesData, error: notesError } = await supabase
          .from("notes")
          .select("id, title, file_url")
          .eq("subject_name", decodeURIComponent(subjectName))
          .eq("year_name", "Year 4") // Ensure it's Year 4
          .eq("department_name", decodeURIComponent(departmentName)); // Ensure dynamic department is used

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
  }, [subjectName, departmentName]);

  if (loading) return <p>Loading notes...</p>;

  return (
    <div className="p-8">
      <h2 className="text-1.7xl font-bold mb-6">
        Notes for {decodeURIComponent(subjectName)} (Year 4)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
              style={{
                height: "150px", // Adjust height for notes box
                boxShadow:
                  "0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="text-lg font-semibold text-center mb-4">
                {note.title}
              </h3>
              <a
                href={note.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline block text-center"
              >
                View Note
              </a>
            </div>
          ))
        ) : (
          <p>No notes available for this subject.</p>
        )}
      </div>
    </div>
  );
};

export default SubjectNotesFourthYear;
