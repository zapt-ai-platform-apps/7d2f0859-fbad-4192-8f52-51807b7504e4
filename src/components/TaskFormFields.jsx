import React from 'react';
import ProjectSelect from './ProjectSelect';
import OrganisationSelect from './OrganisationSelect';

function TaskFormFields(props) {
  const { formData, setFormData } = props;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProjectSelect formData={formData} setFormData={setFormData} />

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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <OrganisationSelect formData={formData} setFormData={setFormData} />

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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-muted mb-1" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            className="w-full p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border cursor-pointer"
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
          </select>
        </div>
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
      </div>
      <div className="mt-4">
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
    </>
  );
}

export default TaskFormFields;