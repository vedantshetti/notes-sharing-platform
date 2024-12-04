import { supabase } from '../../supabaseClient';

// Fetch the current session and user
export const fetchSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user ?? null;
};

// Listen for authentication state changes
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
};

// Sign in with email and password
export const handleSignIn = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
};

// Sign up with email and password
export const handleSignUp = async (email, password) => {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
};

// Sign in with Google
export const handleGoogleLogin = async () => {
  try {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Google login failed:', error.message);
    throw error;
  }
};

// Sign in with GitHub
export const handleGitHubLogin = async () => {
  try {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('GitHub login failed:', error.message);
    throw error;
  }
};

// Logout
export const handleLogout = async () => {
  try {
    await supabase.auth.signOut();
    console.log('Logged out successfully');
  } catch (error) {
    console.error('Logout failed:', error.message);
    throw error;
  }
};
