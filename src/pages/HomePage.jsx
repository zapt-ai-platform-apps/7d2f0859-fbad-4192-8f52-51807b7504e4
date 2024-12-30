import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { supabase } from '../supabaseClient';
import useTasks from '../hooks/useTasks';

function HomePage(props) {
  const user = props.user;
  const { tasks, loading, fetchTasks, handleTaskCreated, handleTaskUpdated, handleTaskDeleted } = useTasks();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    props.setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-light p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">List App</h1>
          <button
            className="bg-danger hover:bg-danger-dark text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-danger transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
        <TaskForm onTaskCreated={handleTaskCreated} />
        <TaskList
          tasks={tasks}
          loading={loading}
          fetchTasks={fetchTasks}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      </div>
      <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-gray-dark text-sm mt-8 block text-center">
        Made on ZAPT
      </a>
    </div>
  );
}

export default HomePage;