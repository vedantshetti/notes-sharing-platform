import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const AdminPage = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartmentsAndSubjects = async () => {
      setLoading(true);

      // Fetch departments
      const { data: departmentData, error: departmentError } = await supabase
        .from("departments")
        .select("id, department_name");
      if (departmentError) {
        console.error("Error fetching departments:", departmentError);
        setLoading(false);
        return;
      }

      setDepartments(departmentData);

      // Fetch subjects if a year is selected
      if (selectedYear) {
        const { data: subjectData, error: subjectError } = await supabase
          .from("subjects")
          .select("id, subject_name, department_id")
          .eq("year_id", selectedYear);

        if (subjectError) {
          console.error("Error fetching subjects:", subjectError);
        } else {
          setSubjects(subjectData);
        }
      }

      setLoading(false);
    };

    fetchDepartmentsAndSubjects();
  }, [selectedYear]);

  if (loading) return <p>Loading...</p>;

  return (
    <div
      className="lg:ml-[250px] p-8"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 className="text-1.7xl font-bold mb-6">
        {selectedYear ? "SELECT YOUR DEPARTMENT" : "SELECT A YEAR"}
      </h2>

      {!selectedYear && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
              style={{
                height: "110px",
                boxShadow:
                  "0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3 className="text-lg font-semibold text-center">{`${year} Year`}</h3>
            </button>
          ))}
        </div>
      )}

      {selectedYear && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {selectedYear === 1 ? (
            subjects.length > 0 ? (
              subjects.map((subject) => (
                <Link
                  key={subject.id}
                  to={`/admin/subject/${subject.subject_name}`}
                  className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
                  style={{
                    height: "110px",
                    boxShadow:
                      "0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h3 className="text-lg font-semibold text-center">
                    {subject.subject_name}
                  </h3>
                </Link>
              ))
            ) : (
              <p>No subjects available for this year.</p>
            )
          ) : (
            departments.map((department) => (
              <Link
                key={department.id}
                to={`/admin/${selectedYear}/${department.department_name}`}
                className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
                style={{
                  height: "110px",
                  boxShadow:
                    "0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h3 className="text-lg font-semibold text-center">
                  {department.department_name}
                </h3>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
