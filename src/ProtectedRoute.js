// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Assuming you have supabase client initialized

const ProtectedRoute = ({ element, ...rest }) => {
  const user = supabase.auth.user(); // Get current user from supabase

  // If the user is authenticated, render the element (route component)
  // Otherwise, redirect to the login page
  return user ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
