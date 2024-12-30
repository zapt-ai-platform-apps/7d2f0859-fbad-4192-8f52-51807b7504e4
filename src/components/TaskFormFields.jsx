import React from 'react';
import TaskBasicFields from './TaskBasicFields';
import TaskAdditionalFields from './TaskAdditionalFields';

function TaskFormFields(props) {
  const { formData, setFormData } = props;

  return (
    <>
      <TaskBasicFields formData={formData} setFormData={setFormData} />
      <TaskAdditionalFields formData={formData} setFormData={setFormData} />
    </>
  );
}

export default TaskFormFields;