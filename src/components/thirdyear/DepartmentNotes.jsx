import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const DepartmentNotes = () => {
  const { departmentName } = useParams(); // Capture the department name from the URL
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartmentNotes = async () => {
      setLoading(true);
      // Fetch notes for the specific department
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("department_name", departmentName) // Use the department name as a filter
        .eq("year", 3); // Only fetch 3rd-year department notes

      if (error) {
        console.error("Error fetching department notes:", error);
      } else {
        setNotes(data);
      }

      setLoading(false);
    };

    fetchDepartmentNotes();
  }, [departmentName]);

  if (loading) return <p>Loading notes...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">{departmentName} Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
              style={{
                height: "150px",
                boxShadow:
                  "0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="text-lg font-semibold text-center">
                {note.title}
              </h3>
              <p className="text-sm text-gray-600">{note.description}</p>
            </div>
          ))
        ) : (
          <p>No notes available for this department.</p>
        )}
      </div>
    </div>
  );
};

export default DepartmentNotes;
