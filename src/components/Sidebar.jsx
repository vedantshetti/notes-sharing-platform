import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">xxyyzz</h1>
      </div>
      <nav className="flex flex-col p-4">
        <Link
          to="/1st-year"
          className="mb-4 text-gray-700 hover:bg-blue-200 p-2 rounded-md"
        >
          1st Year
        </Link>
        <Link
          to="/2nd-year"
          className="mb-4 text-gray-700 hover:bg-blue-200 p-2 rounded-md"
        >
          2nd Year
        </Link>
        <Link
          to="/3rd-year"
          className="mb-4 text-gray-700 hover:bg-blue-200 p-2 rounded-md"
        >
          3rd Year
        </Link>
        <Link
          to="/4th-year"
          className="mb-4 text-gray-700 hover:bg-blue-200 p-2 rounded-md"
        >
          4th Year
        </Link>
        <Link
          to="/upload"
          className="mb-4 text-gray-700 hover:bg-blue-200 p-2 rounded-md"
        >
          Upload Notes
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
