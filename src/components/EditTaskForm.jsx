import React from 'react';
import TaskFormFields from './TaskFormFields';
import { useEditTaskForm } from '../hooks/useEditTaskForm';
import EditTaskFormButtons from './EditTaskFormButtons';

function EditTaskForm(props) {
  const {
    formData,
    setFormData,
    loading,
    handleSubmit,
    handleDelete,
  } = useEditTaskForm(props);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-primary">Edit Task</h2>
      <TaskFormFields formData={formData} setFormData={setFormData} />
      <EditTaskFormButtons
        loading={loading}
        handleDelete={handleDelete}
        onCancel={props.onCancel}
      />
    </form>
  );
}

export default EditTaskForm;