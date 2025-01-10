```jsx
import React from 'react';

function TaskFilter(props) {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
      <input
        type="text"
        placeholder="Filter tasks"
        value={props.filterText}
        onChange={(e) => props.setFilterText(e.target.value)}
        className="flex-1 p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border"
      />
      <select
        value={props.filterField}
        onChange={(e) => props.setFilterField(e.target.value)}
        className="p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border cursor-pointer w-full md:w-auto"
      >
        <option value="referenceNumber">Reference Number</option>
        <option value="description">Description</option>
        <option value="project">Project / Category</option>
        <option value="status">Status</option>
        <option value="priority">Priority</option>
        <option value="organisation">Organisation</option>
        <option value="taskOwner">Task Owner</option>
      </select>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={props.showOverdue}
          onChange={(e) => props.setShowOverdue(e.target.checked)}
          className="form-checkbox h-4 w-4 text-primary"
        />
        <span className="text-sm text-muted">Show Overdue</span>
      </label>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={props.showCompleted}
          onChange={(e) => props.setShowCompleted(e.target.checked)}
          className="form-checkbox h-4 w-4 text-primary"
        />
        <span className="text-sm text-muted">Show Completed</span>
      </label>
      <button
        onClick={() => {
          props.setFilterText('');
          props.setShowOverdue(false);
          props.setShowCompleted(false);
        }}
        className="bg-muted hover:bg-muted-dark text-white p-3 rounded-lg transition duration-300 ease-in-out cursor-pointer w-full md:w-auto"
      >
        Clear Filters
      </button>
    </div>
  );
}

export default TaskFilter;
```