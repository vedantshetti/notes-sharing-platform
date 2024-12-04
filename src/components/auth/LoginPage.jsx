import React, { useState, useEffect } from 'react';


import { useNavigate } from 'react-router-dom';
import { fetchSession, handleSignIn } from './auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  // Redirect if the user is already logged in
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const user = await fetchSession();
      if (user) {
        navigate('/dashboard');
      }
    };
    checkUserLoggedIn();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      await handleSignIn(email, password);
      navigate('/dashboard'); // Redirect after login
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white"> {/* Changed the background to white */}
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Welcome Back!</h2>
        {error && <div className="bg-red-100 text-red-600 p-2 rounded mb-4">{error}</div>}
        {successMessage && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <span className="text-blue-600">Don't have an account? <a href="/auth/register" className="hover:underline">Register</a></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
