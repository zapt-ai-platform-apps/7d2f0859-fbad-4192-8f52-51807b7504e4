import React from 'react';

function DescriptionField({ formData, setFormData }) {
  return (
    <div>
      <label className="block text-sm font-medium text-muted mb-1" htmlFor="description">
        Description
      </label>
      <input
        id="description"
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="w-full p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border"
        required
      />
    </div>
  );
}

export default DescriptionField;