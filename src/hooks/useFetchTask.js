import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function useFetchTask(id, navigate) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      try {
        const response = await fetch(`/api/getTask?id=${id}`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        });
        if (response.ok) {
          const fetchedTask = await response.json();
          setTask(fetchedTask);
        } else if (response.status === 404) {
          alert('Task not found');
          navigate('/tasks/view');
        } else {
          console.error('Error fetching task:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  return { task, loading };
}

export default useFetchTask;