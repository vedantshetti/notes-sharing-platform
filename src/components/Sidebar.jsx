import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchSession,
  onAuthStateChange,
  handleGoogleLogin,
  handleGitHubLogin,
  handleLogout,
} from "./auth/auth";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Fetch user session and listen for auth changes
  useEffect(() => {
    const initializeAuth = async () => {
      const user = await fetchSession();
      setUser(user);
    };

    initializeAuth();

    const { data: authListener } = onAuthStateChange(setUser);

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="lg:flex">
        <div className="lg:hidden flex justify-between p-4">
          <button onClick={toggleSidebar} className="text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar for mobile */}
        <div
          className={`lg:hidden w-[57%] h-screen bg-white shadow-lg transition-transform duration-300 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-0 z-50`}
        >
          <div className="flex justify-between p-6 border-b border-gray-300">
            <h1 className="text-2xl font-bold text-gray-800">NotesBank</h1>
            <button
              onClick={closeSidebar}
              className="border border-gray-400 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
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

            {/* Account Section */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800">Account</h2>
              {user ? (
                <div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white p-2 rounded-md mt-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full mb-2 bg-blue-500 text-white p-2 rounded-md flex items-center justify-center"
                  >
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png"
                        alt="Google Logo"
                        className="w-4 h-4"
                      />
                    </div>
                    <span className="ml-2">Google Login</span>
                  </button>
                  <button
                    onClick={handleGitHubLogin}
                    className="w-full bg-gray-800 text-white p-2 rounded-md flex items-center justify-center"
                  >
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                        alt="GitHub Logo"
                        className="w-4 h-4"
                      />
                    </div>
                    <span className="ml-2">GitHub Login</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Sidebar for large screens (fixed on the left) */}
        <div className="lg:block hidden w-[250px] bg-white shadow-lg fixed inset-y-0 left-0 z-50">
          <div className="flex justify-between p-6 border-b border-gray-300">
            <h1 className="text-2xl font-bold text-gray-800">NotesBank</h1>
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

            {/* Account Section */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-800">Account</h2>
              {user ? (
                <div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white p-2 rounded-md mt-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full mb-2 bg-blue-500 text-white p-2 rounded-md flex items-center justify-center"
                  >
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google.png"
                        alt="Google Logo"
                        className="w-4 h-4"
                      />
                    </div>
                    <span className="ml-2">Google Login</span>
                  </button>
                  <button
                    onClick={handleGitHubLogin}
                    className="w-full bg-gray-800 text-white p-2 rounded-md flex items-center justify-center"
                  >
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                        alt="GitHub Logo"
                        className="w-4 h-4"
                      />
                    </div>
                    <span className="ml-2">GitHub Login</span>
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Main content area */}
        <div className="lg:w-[calc(100%-250px)] lg:ml-[250px] flex-1 p-6">
          {/* The main content of the page goes here */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
