import React from 'react';

function TaskDatePriorityFields(props) {
  const { formData, setFormData } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
          className="w-full p-3 border border-gray-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
          className="w-full p-3 border border-gray-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border cursor-pointer"
        >
          <option value="" disabled>
            Select Priority
          </option>
          <option value="High">High</option>
          <option value="Normal">Normal</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </div>
  );
}

export default TaskDatePriorityFields;