import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import useTasks from '../hooks/useTasks';

function ViewTasksPage(props) {
  const { tasks, loading, fetchTasks, handleTaskCreated, handleTaskUpdated, handleTaskDeleted } = useTasks();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    props.setUser(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">View Tasks</h1>
          <div className="flex space-x-4">
            <Link
              to="/tasks/create"
              className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-secondary transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              Create Task
            </Link>
            <Link
              to="/reports/view"
              className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-secondary transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            >
              View Reports
            </Link>
            <button
              className="bg-danger hover:bg-danger-dark text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-danger transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
        <TaskList
          tasks={tasks}
          loading={loading}
          fetchTasks={fetchTasks}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
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

export default ViewTasksPage;