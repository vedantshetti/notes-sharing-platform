import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('subjects')
        .select('subject_name, departments(department_name)')
        .order('subject_name', { ascending: true }); // Order subjects alphabetically

      if (error) {
        console.error('Error fetching subjects:', error);
      } else {
        setSubjects(data);
      }

      setLoading(false);
    };

    fetchSubjects();
  }, []);

  if (loading) return <p>Loading subjects...</p>;

  return (
    <div className="p-8">
      <h2 className="text-1.7xl font-bold mb-6">SELECT YOUR SUBJECT</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <Link
            to={`/subject/${encodeURIComponent(subject.subject_name)}`}
            key={index}
            className="bg-white shadow-md p-4 rounded-lg border border-gray-200 h-32 flex items-center justify-center hover:shadow-lg transition-shadow"
            style={{
              height: '150px', // Fixed height for all boxes
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 5px 15px rgba(0, 0, 0, 0.1)' // Enhanced shadow
            }}
          >
            <h3 className="text-lg font-semibold text-center">
              {subject.subject_name}
              {subject.departments?.department_name && (
                <span className="text-gray-500 text-sm block mt-1">
                  ({subject.departments.department_name})
                </span>
              )}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
