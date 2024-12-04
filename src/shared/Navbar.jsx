import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // You can add logic to toggle actual dark mode styles (CSS or context)
  };

  return (
    <div
      className={`bg-white shadow-md p-[1.5rem] w-full fixed top-0 left-0 z-50 transition-all ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-700"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Hamburger Icon for Mobile */}
        <button onClick={toggleSidebar} className="lg:hidden">
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          NotesBank
        </Link>

        {/* Dark Mode Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleDarkModeToggle}
            className="text-gray-700 hover:text-blue-500 dark:text-white"
          >
            <FontAwesomeIcon
              icon={isDarkMode ? faSun : faMoon}
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
