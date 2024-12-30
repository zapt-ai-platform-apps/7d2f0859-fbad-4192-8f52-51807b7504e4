import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { updateTask, deleteTask } from '../api/taskApi';

export function useEditTaskForm(props) {
  const [formData, setFormData] = useState({ ...props.task });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Ensure dueDate is formatted as YYYY-MM-DD
    if (props.task.dueDate) {
      const date = new Date(props.task.dueDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      setFormData(prevData => ({
        ...prevData,
        dueDate: `${year}-${month}-${day}`,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        dueDate: '',
      }));
    }
  }, [props.task.dueDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const adjustedFormData = { ...formData, id: props.task.id };
    if (adjustedFormData.dueDate === '') {
      adjustedFormData.dueDate = null;
    }

    const { data: { session } } = await supabase.auth.getSession();
    try {
      const updatedTask = await updateTask(session.access_token, adjustedFormData);
      props.onTaskUpdated(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    try {
      await deleteTask(session.access_token, props.task.id);
      props.onTaskDeleted(props.task.id);
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    handleSubmit,
    handleDelete,
  };
}