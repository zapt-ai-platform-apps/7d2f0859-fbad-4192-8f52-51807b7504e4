import React from 'react';

function TaskBasicFields(props) {
  const { formData, setFormData } = props;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Project / Category"
          value={formData.project}
          onChange={(e) =>
            setFormData({ ...formData, project: e.target.value })
          }
          className="w-full p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border"
        />
      </div>
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="w-full p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border"
        required
      />
    </>
  );
}

export default TaskBasicFields;