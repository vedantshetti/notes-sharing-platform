import React, { useState } from 'react';
import { handleSignUp, handleGoogleLogin, handleGitHubLogin } from './auth';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      await handleSignUp(email, password);
      setSuccessMessage(
        'Confirmation email sent! Please check your inbox to verify your email address.'
      );
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-white p-8 rounded-md shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Create an Account
        </h2>
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
            Register
          </button>
        </form>

        <div className="my-4 text-center">OR</div>

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

        <div className="text-center mt-4">
          <span className="text-blue-600">
            Already have an account?{' '}
            <a href="/auth/login" className="hover:underline">
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
