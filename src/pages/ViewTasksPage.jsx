import React from 'react';
import TaskList from '../components/TaskList';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import useTasks from '../hooks/useTasks';
import ViewTasksHeader from '../components/ViewTasksHeader';
import ViewTasksFooter from '../components/ViewTasksFooter';

function ViewTasksPage(props) {
  const { tasks, loading, fetchTasks, handleTaskCreated, handleTaskUpdated, handleTaskDeleted } = useTasks();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    props.setUser(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 flex flex-col">
      <ViewTasksHeader onSignOut={handleSignOut} />
      <div className="w-full flex-grow">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-2xl text-muted mb-6">You have no tasks.</p>
            <Link
              to="/tasks/create"
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-8 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer text-xl"
            >
              Create Your First Task
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex justify-end mb-4">
              <Link
                to="/tasks/create"
                className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              >
                Create Task
              </Link>
            </div>
            <TaskList
              tasks={tasks}
              loading={loading}
              fetchTasks={fetchTasks}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted}
            />
          </div>
        )}
      </div>
      <ViewTasksFooter />
    </div>
  );
}

export default ViewTasksPage;