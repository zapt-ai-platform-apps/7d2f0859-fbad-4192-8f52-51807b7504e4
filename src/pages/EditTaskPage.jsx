import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import EditTaskForm from '../components/EditTaskForm';
import { supabase } from '../supabaseClient';
import useTasks from '../hooks/useTasks';

function EditTaskPage(props) {
  const { id } = useParams();
  const { tasks, handleTaskUpdated, handleTaskDeleted } = useTasks();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === parseInt(id, 10));
    if (foundTask) {
      setTask(foundTask);
    }
  }, [tasks, id]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    props.setUser(null);
  };

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Loading task...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Edit Task</h1>
          <div className="flex space-x-4">
            <Link to="/tasks/view" className="text-secondary hover:underline">
              View Tasks
            </Link>
            <button
              className="bg-danger hover:bg-danger-dark text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-danger transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
        <EditTaskForm task={task} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
      </div>
      <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-muted text-sm mt-8 block text-center hover:underline cursor-pointer">
        Made on ZAPT
      </a>
    </div>
  );
}

export default EditTaskPage;