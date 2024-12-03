import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const DepartmentSubjectFourthYear = () => {
  const { departmentName } = useParams(); // Capture the department name from the URL
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);

      try {
        // Step 1: Get the departmentId based on departmentName
        const { data: departmentData, error: departmentError } = await supabase
          .from("departments")
          .select("id")
          .eq("department_name", departmentName)
          .single();

        if (departmentError || !departmentData) {
          console.error("Error fetching department:", departmentError || "No department found");
          setLoading(false);
          return;
        }

        const departmentId = departmentData.id;

        // Step 2: Fetch subjects based on departmentId and year (fourth year)
        const { data: subjectsData, error: subjectsError } = await supabase
          .from("subjects")
          .select("subject_name")
          .eq("department_id", departmentId) // Filter by department ID
          .eq("year_id", 4); // Filter by 4th year

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
  }, [departmentName]);

  if (loading) return <p>Loading subjects...</p>;

  return (
    <div className="p-8">
      <h2 className="text-1.7xl font-bold mb-6">{departmentName} Subjects (4th Year)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <Link
              key={subject.subject_name}
              to={`/4th-year/${departmentName}/${encodeURIComponent(subject.subject_name)}`} // Encode subject name for proper URL
              className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
              style={{
                height: '110px', // Fixed height for all boxes
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)', // Enhanced shadow
                display: 'flex', // Flexbox for centering text
                alignItems: 'center', // Center items vertically
                justifyContent: 'center' // Center items horizontally
              }}
            >
              <h3 className="text-lg font-semibold text-center">{subject.subject_name}</h3>
            </Link>
          ))
        ) : (
          <p>No subjects available for this department.</p>
        )}
      </div>
    </div>
  );
};

export default DepartmentSubjectFourthYear;
