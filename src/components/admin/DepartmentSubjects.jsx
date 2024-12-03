import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const DepartmentSubjects = () => {
  const { year, departmentName } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);

      try {
        // Fetch department ID
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

        // Fetch subjects based on department and year
        const { data: subjectsData, error: subjectsError } = await supabase
          .from("subjects")
          .select("subject_name")
          .eq("department_id", departmentId)
          .eq("year_id", year);

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
  }, [year, departmentName]);

  if (loading) return <p>Loading subjects...</p>;

  return (
    <div className="p-8">
      <h2 className="text-1.7xl font-bold mb-6">{departmentName} Subjects (Year {year})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Link
            key={subject.subject_name}
            to={`/admin/${year}/${departmentName}/${encodeURIComponent(subject.subject_name)}`}
            className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-center">{subject.subject_name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DepartmentSubjects;
