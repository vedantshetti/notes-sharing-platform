import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const AuthState = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  if (user) {
    return <div>Welcome, {user.email}</div>;
  } else {
    return <div>Please log in</div>;
  }
};

export default AuthState;
