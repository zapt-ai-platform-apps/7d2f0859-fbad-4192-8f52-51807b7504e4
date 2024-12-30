import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import { supabase } from './supabaseClient';
import * as Sentry from '@sentry/browser';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserSignedIn = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };

    checkUserSignedIn();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/home" /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/home" /> : <LoginPage />} />
      <Route path="/home" element={user ? <HomePage user={user} /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;