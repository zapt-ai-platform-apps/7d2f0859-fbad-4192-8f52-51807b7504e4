import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    try {
      const response = await fetch('/api/getTasks', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (response.ok) {
        const fetchedTasks = await response.json();
        setTasks(fetchedTasks);
      } else {
        console.error('Error fetching tasks:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return {
    tasks,
    loading,
    fetchTasks,
    handleTaskCreated,
    handleTaskUpdated,
    handleTaskDeleted,
  };
}

export default useTasks;