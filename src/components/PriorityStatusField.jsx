import React from 'react';
import PrioritySelector from './PrioritySelector';

function PriorityStatusField({ formData, setFormData }) {
  return (
    <div>
      <label className="block text-sm font-medium text-muted mb-1">
        Priority
      </label>
      <PrioritySelector
        value={formData.priority}
        onChange={(value) =>
          setFormData({ ...formData, priority: value })
        }
      />
    </div>
  );
}

export default PriorityStatusField;