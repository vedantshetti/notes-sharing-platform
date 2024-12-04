import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';

const FourthYear = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      // Fetch all departments for the 4th year
      const { data, error } = await supabase
        .from('departments')
        .select('id, department_name'); // Fetch department names and ids

      if (error) {
        console.error('Error fetching departments:', error);
      } else {
        setDepartments(data);
      }

      setLoading(false);
    };

    fetchDepartments();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div
      className="lg:ml-[250px] p-8" // Ensures content starts after the sidebar on large screens
      style={{
        minHeight: '100vh', // Ensures the layout stretches to full height
        backgroundColor: '#f9f9f9', // Light background for better contrast
      }}
    >
      <h2 className="text-1.7xl font-bold mb-6">SELECT YOUR DEPARTMENT</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {departments.length > 0 ? (
          departments.map((department) => (
            <Link
              key={department.id}
              to={`/4th-year/${department.department_name}`} // Navigate to the department's specific page based on name
              className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
              style={{
                height: '110px', // Fixed height for all boxes
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)', // Increased shadow
                display: 'flex', // Flexbox for centering text
                alignItems: 'center', // Center items vertically
                justifyContent: 'center', // Center items horizontally
              }}
            >
              <h3 className="text-lg font-semibold text-center">{department.department_name}</h3>
            </Link>
          ))
        ) : (
          <p>No departments available for the 4th year.</p>
        )}
      </div>
    </div>
  );
};

export default FourthYear;
