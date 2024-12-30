import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import TaskFormFields from './TaskFormFields';
import { updateTask, deleteTask } from '../api/taskApi';

function EditTaskForm(props) {
  const [formData, setFormData] = useState({ ...props.task });
  const [loading, setLoading] = useState(false);

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

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">Edit Task</h2>
      <TaskFormFields formData={formData} setFormData={setFormData} />
      <div className="flex space-x-4">
        <button
          type="submit"
          className={`flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Updating Task...' : 'Update Task'}
        </button>
        <button
          type="button"
          className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={props.onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={handleDelete}
        >
          {loading ? 'Deleting...' : 'Delete Task'}
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm;