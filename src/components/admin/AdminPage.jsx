import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const AdminPage = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch departments and subjects based on selected year
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      let query = supabase.from('departments').select('id, department_name');
      if (selectedYear) {
        // Fetch subjects for selected year
        const { data: subjectsData, error: subjectsError } = await supabase
          .from('subjects')
          .select('subject_name, department_id')
          .eq('year_id', selectedYear);

        if (subjectsError) {
          console.error("Error fetching subjects:", subjectsError);
        } else {
          setSubjects(subjectsData);
        }
      }

      // Fetch departments if year is selected
      const { data, error } = await query;
      if (error) {
        console.error('Error fetching departments:', error);
      } else {
        setDepartments(data);
      }

      setLoading(false);
    };

    fetchDepartments();
  }, [selectedYear]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h2 className="text-1.7xl font-bold mb-6">Admin Panel</h2>
      {/* Year selection */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <button 
    onClick={() => setSelectedYear(1)} 
    className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
    style={{
      height: '110px', // Fixed height for all boxes
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)', // Increased shadow
    }}
  >
    <h3 className="text-lg font-semibold text-center">1st Year</h3>
  </button>
  
  <button 
    onClick={() => setSelectedYear(2)} 
    className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
    style={{
      height: '110px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)',
    }}
  >
    <h3 className="text-lg font-semibold text-center">2nd Year</h3>
  </button>

  <button 
    onClick={() => setSelectedYear(3)} 
    className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
    style={{
      height: '110px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)',
    }}
  >
    <h3 className="text-lg font-semibold text-center">3rd Year</h3>
  </button>

  <button 
    onClick={() => setSelectedYear(4)} 
    className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
    style={{
      height: '110px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)',
    }}
  >
    <h3 className="text-lg font-semibold text-center">4th Year</h3>
  </button>
</div>

      {/* Departments and Subjects display */}
      {selectedYear && (
        <>
          {selectedYear === 1 ? (
            // For 1st year, directly show subjects
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <Link
                    key={subject.id}
                    to={`/admin/subject/${subject.subject_name}`}
                    className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
                    style={{
                      height: '110px', // Fixed height for all boxes
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)', // Increased shadow
                    }}
                  >
                    <h3 className="text-lg font-semibold text-center">{subject.subject_name}</h3>
                  </Link>
                ))
              ) : (
                <p>No subjects available for this year.</p>
              )}
            </div>
          ) : (
            // For 2nd, 3rd, and 4th years, first show departments
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {departments.map((department) => (
                <Link
                  key={department.id}
                  to={`/admin/${selectedYear}/${department.department_name}`}
                  className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
                  style={{
                    height: '110px', // Fixed height for all boxes
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)', // Increased shadow
                  }}
                >
                  <h3 className="text-lg font-semibold text-center">{department.department_name}</h3>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPage;
