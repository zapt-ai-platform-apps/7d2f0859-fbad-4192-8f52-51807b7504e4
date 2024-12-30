import React from 'react';
import TaskBasicFields from './TaskBasicFields';
import TaskAdditionalFields from './TaskAdditionalFields';

function TaskFormFields(props) {
  const { formData, setFormData } = props;

  return (
    <>
      <TaskBasicFields formData={formData} setFormData={setFormData} />
      <TaskAdditionalFields formData={formData} setFormData={setFormData} />
      <div>
        <label className="block text-sm font-medium text-muted mb-1" htmlFor="taskOwner">
          Task Owner Name
        </label>
        <input
          id="taskOwner"
          type="text"
          placeholder="Task Owner Name"
          value={formData.taskOwner}
          onChange={(e) =>
            setFormData({ ...formData, taskOwner: e.target.value })
          }
          className="w-full p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border"
        />
      </div>
    </>
  );
}

export default TaskFormFields;