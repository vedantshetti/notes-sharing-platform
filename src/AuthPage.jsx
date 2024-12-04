import React, { useState, useEffect } from 'react';
import { handleSignIn, handleSignUp } from './components/auth/auth';
import { fetchSession } from './components/auth/auth'; // Assuming this function checks session status
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate(); // Used for navigation

  // Redirect if the user is already logged in
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const user = await fetchSession(); // Fetch current session
      if (user) {
        navigate('/dashboard'); // Redirect to dashboard or home if logged in
      }
    };
    checkUserLoggedIn();
  }, [navigate]);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      if (isLogin) {
        await handleSignIn(email, password);
        navigate('/dashboard'); // Redirect to dashboard after login
      } else {
        await handleSignUp(email, password);
        setSuccessMessage(
          'Confirmation email sent! Please check your inbox to verify your email address.'
        );
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          {isLogin ? 'Welcome Back!' : 'Create an Account'}
        </h2>
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-semibold text-gray-700">
              Email
            </label>
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
            <label htmlFor="password" className="block font-semibold text-gray-700">
              Password
            </label>
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
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={toggleAuthMode}
            className="text-blue-600 hover:underline"
          >
            {isLogin
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </button>
        </div>
        <div className="mt-6 text-sm text-center text-gray-500">
          By continuing, you agree to our <span className="text-blue-600">Terms of Service</span> and <span className="text-blue-600">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
