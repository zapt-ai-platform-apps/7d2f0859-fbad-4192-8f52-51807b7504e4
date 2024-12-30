import React from 'react';

function TaskFilter(props) {
  return (
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="Filter tasks"
        value={props.filterText}
        onChange={(e) => props.setFilterText(e.target.value)}
        className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
      />
      <select
        value={props.filterField}
        onChange={(e) => props.setFilterField(e.target.value)}
        className="p-3 border-t border-b border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border cursor-pointer"
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
        className="bg-gray-200 p-3 rounded-r-lg hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer"
      >
        Clear
      </button>
    </div>
  );
}

export default TaskFilter;