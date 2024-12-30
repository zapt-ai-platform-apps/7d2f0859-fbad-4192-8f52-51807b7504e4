import React from 'react';

function TaskStatusOrganisationFields(props) {
  const { formData, setFormData } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value })
          }
          className="w-full p-3 border border-gray-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border cursor-pointer"
        >
          <option value="Open">Open</option>
          <option value="Complete">Complete</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Organisation
        </label>
        <input
          type="text"
          placeholder="Organisation"
          value={formData.organisation}
          onChange={(e) =>
            setFormData({ ...formData, organisation: e.target.value })
          }
          className="w-full p-3 border border-gray-dark rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border"
        />
      </div>
    </div>
  );
}

export default TaskStatusOrganisationFields;