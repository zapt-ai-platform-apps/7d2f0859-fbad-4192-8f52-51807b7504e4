import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditTaskForm from '../components/EditTaskForm';
import { supabase } from '../supabaseClient';
import useFetchTask from '../hooks/useFetchTask';
import EditTaskHeader from '../components/EditTaskHeader';

function EditTaskPage(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { task, loading } = useFetchTask(id, navigate);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    props.setUser(null);
  };

  const handleTaskUpdated = () => {
    navigate('/tasks/view');
  };

  const handleTaskDeleted = () => {
    navigate('/tasks/view');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Loading task...</p>
      </div>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-6xl mx-auto">
        <EditTaskHeader handleSignOut={handleSignOut} />
        <EditTaskForm
          task={task}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
          onCancel={() => navigate('/tasks/view')}
        />
      </div>
      <a
        href="https://www.zapt.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted text-sm mt-8 block text-center hover:underline cursor-pointer"
      >
        Made on ZAPT
      </a>
    </div>
  );
}

export default EditTaskPage;