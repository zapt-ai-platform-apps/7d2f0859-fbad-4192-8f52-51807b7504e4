import React from 'react';
import TaskFormFields from './TaskFormFields';
import useTaskForm from '../hooks/useTaskForm';

function TaskForm(props) {
  const {
    formData,
    setFormData,
    handleSubmit,
    loading,
  } = useTaskForm(props.onTaskCreated);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <TaskFormFields formData={formData} setFormData={setFormData} />
      <button
        type="submit"
        className={`w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Creating Task...' : 'Create Task'}
      </button>
    </form>
  );
}

export default TaskForm;