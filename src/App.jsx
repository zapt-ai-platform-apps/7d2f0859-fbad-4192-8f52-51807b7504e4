import { Route, Routes, Navigate } from '@solidjs/router';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import { createSignal, onMount, createEffect } from 'solid-js';
import { supabase } from './supabaseClient';

function App() {
  const [user, setUser] = createSignal(null);

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  });

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user() ? <Navigate href="/home" /> : <LoginPage />} />
      <Route path="/home" element={user() ? <HomePage user={user} /> : <Navigate href="/login" />} />
    </Routes>
  );
}

export default App;