import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const SecondYear = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      // Fetch all departments for the 2nd year (no need for a 'year' column filter)
      const { data, error } = await supabase
        .from('departments')
        .select('*'); // Fetch all departments (no filtering)

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
    <div className="p-8">
      <h2 className="text-1.7xl font-bold mb-6">SELECT YOUR DEPARTMENT</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <div
            key={department.id}
            className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
            style={{
              height: '110px', // Fixed height for all boxes
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)' // Increased shadow
            }}
          >
            <h3 className="text-lg font-semibold text-center">{department.department_name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondYear;
