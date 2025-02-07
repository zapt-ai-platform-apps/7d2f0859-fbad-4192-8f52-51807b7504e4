import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../api/users';
import UsersTable from '../components/UsersTable';

function UsersPage({ user, setUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers(supabase);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Registered Users</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/tasks/view')}
              className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-6 rounded-full cursor-pointer"
            >
              Back to Tasks
            </button>
            <button
              onClick={handleSignOut}
              className="bg-danger hover:bg-danger-dark text-white font-semibold py-2 px-6 rounded-full cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <UsersTable users={users} />
        )}
      </div>
      <a
        href="https://www.zapt.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted text-sm mt-8 block text-center cursor-pointer"
      >
        Made on ZAPT
      </a>
    </div>
  );
}

export default UsersPage;