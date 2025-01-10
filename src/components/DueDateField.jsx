import React from 'react';

function DueDateField({ formData, setFormData }) {
  return (
    <div>
      <label className="block text-sm font-medium text-muted mb-1" htmlFor="dueDate">
        Due Date
      </label>
      <input
        id="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={(e) =>
          setFormData({ ...formData, dueDate: e.target.value })
        }
        className="w-full p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border"
      />
    </div>
  );
}

export default DueDateField;