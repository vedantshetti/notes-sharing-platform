import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const FirstYear = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);

      try {
        // Fetch subjects for the first year
        const { data: subjectsData, error: subjectsError } = await supabase
          .from("subjects")
          .select("subject_name")
          .eq("year_id", 1); // Filter by 1st year

        if (subjectsError) {
          console.error("Error fetching subjects:", subjectsError);
        } else {
          setSubjects(subjectsData);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }

      setLoading(false);
    };

    fetchSubjects();
  }, []);

  if (loading) return <p>Loading subjects...</p>;

  return (
    <div
      className="lg:ml-[250px] p-8" // Ensures content starts after the sidebar on large screens
      style={{
        minHeight: "100vh", // Ensures the layout stretches to full height
        backgroundColor: "#f9f9f9", // Light background for better contrast
      }}
    >
      <h2 className="text-1.7xl font-bold mb-6">Subjects (1st Year)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <Link
              key={subject.subject_name}
              to={`/1st-year/${encodeURIComponent(subject.subject_name)}`} // Encode subject name for proper URL
              className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
              style={{
                height: "110px", // Fixed height for all boxes
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)", // Enhanced shadow
                display: "flex", // Flexbox for centering text
                alignItems: "center", // Center items vertically
                justifyContent: "center", // Center items horizontally
              }}
            >
              <h3 className="text-lg font-semibold text-center">{subject.subject_name}</h3>
            </Link>
          ))
        ) : (
          <p>No subjects available for the 1st year.</p>
        )}
      </div>
    </div>
  );
};

export default FirstYear;
