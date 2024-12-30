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
      <button
        onClick={() => props.setFilterText('')}
        className="bg-muted hover:bg-muted-dark text-white p-3 rounded-lg transition duration-300 ease-in-out cursor-pointer w-full md:w-auto"
      >
        Clear
      </button>
    </div>
  );
}

export default TaskFilter;