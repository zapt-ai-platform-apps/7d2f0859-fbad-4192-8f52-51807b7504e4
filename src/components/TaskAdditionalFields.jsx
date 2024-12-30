import React from 'react';
import TaskDatePriorityFields from './TaskDatePriorityFields';
import TaskStatusOrganisationFields from './TaskStatusOrganisationFields';

function TaskAdditionalFields(props) {
  const { formData, setFormData } = props;

  return (
    <>
      <TaskDatePriorityFields formData={formData} setFormData={setFormData} />
      <TaskStatusOrganisationFields formData={formData} setFormData={setFormData} />
    </>
  );
}

export default TaskAdditionalFields;