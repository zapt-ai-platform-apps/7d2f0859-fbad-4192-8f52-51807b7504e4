import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import CreateTaskPage from './pages/CreateTaskPage';
import ViewTasksPage from './pages/ViewTasksPage';
import EditTaskPage from './pages/EditTaskPage';
import ViewReportsPage from './pages/ViewReportsPage';
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';
import { supabase } from './supabaseClient';

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
      <Route path="/tasks/view" element={user ? <ViewTasksPage user={user} setUser={setUser} /> : <Navigate to="/login" />} />
      <Route path="/tasks/create" element={user ? <CreateTaskPage user={user} setUser={setUser} /> : <Navigate to="/login" />} />
      <Route path="/tasks/edit/:id" element={user ? <EditTaskPage user={user} setUser={setUser} /> : <Navigate to="/login" />} />
      <Route path="/reports/view" element={user ? <ViewReportsPage user={user} setUser={setUser} /> : <Navigate to="/login" />} />
      <Route path="/settings" element={user ? <SettingsPage user={user} setUser={setUser} /> : <Navigate to="/login" />} />
      <Route path="/users/view" element={user ? <UsersPage user={user} setUser={setUser} /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;