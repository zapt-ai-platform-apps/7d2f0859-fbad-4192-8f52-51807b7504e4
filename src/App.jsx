import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import CreateTaskPage from './pages/CreateTaskPage';
import ViewTasksPage from './pages/ViewTasksPage';
import EditTaskPage from './pages/EditTaskPage';
import { supabase } from './supabaseClient';
import * as Sentry from '@sentry/browser';

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
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
      <Route path="/" element={user ? <Navigate to="/tasks/view" /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/tasks/view" /> : <LoginPage />} />
      <Route path="/tasks/view" element={user ? <ViewTasksPage user={user} /> : <Navigate to="/login" />} />
      <Route path="/tasks/create" element={user ? <CreateTaskPage user={user} /> : <Navigate to="/login" />} />
      <Route path="/tasks/edit/:id" element={user ? <EditTaskPage user={user} /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;