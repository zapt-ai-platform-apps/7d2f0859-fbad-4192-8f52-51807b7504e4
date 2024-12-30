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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600">List App</h1>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
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
      <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm mt-8 block text-center">
        Made on ZAPT
      </a>
    </div>
  );
}

export default HomePage;