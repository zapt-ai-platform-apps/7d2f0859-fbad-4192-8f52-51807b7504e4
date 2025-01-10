import React from 'react';

function TaskOwnerField({ formData, setFormData }) {
  return (
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
        className="w-full p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border cursor-pointer"
      />
    </div>
  );
}

export default TaskOwnerField;