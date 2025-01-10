import React from 'react';

function StatusField({ formData, setFormData }) {
  return (
    <div>
      <label className="block text-sm font-medium text-muted mb-1" htmlFor="status">
        Status
      </label>
      <select
        id="status"
        value={formData.status}
        onChange={(e) =>
          setFormData({ ...formData, status: e.target.value })
        }
        className="w-full p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border cursor-pointer"
      >
        <option value="">Select Status</option>
        <option value="Open">Open</option>
        <option value="Complete">Complete</option>
        <option value="Overdue">Overdue</option>
      </select>
    </div>
  );
}

export default StatusField;