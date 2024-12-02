import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';

const ThirdYear = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      // Fetch all departments (no need for a 'year' column filter)
      const { data, error } = await supabase
        .from('departments')
        .select('department_name'); // Fetch only department names

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
      <h2 className="text-2xl font-bold mb-6">3rd Year Departments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <div
            key={department.id}
            className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
          >
            <h3 className="text-lg font-semibold">{department.department_name}</h3>
            <p className="text-sm text-gray-600">Click to view notes for this department</p>
            <div className="mt-4">
              <Link
                to={`/3rd-year/${department.id}`}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                View Notes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdYear;
