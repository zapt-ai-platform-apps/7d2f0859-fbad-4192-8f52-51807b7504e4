import React from 'react';

function TaskTableHeader(props) {
  return (
    <thead>
      <tr>
        <th
          className="px-4 py-2 cursor-pointer"
          onClick={() => props.handleSort('referenceNumber')}
        >
          Ref No.
        </th>
        <th
          className="px-4 py-2 cursor-pointer"
          onClick={() => props.handleSort('description')}
        >
          Description
        </th>
        <th
          className="px-4 py-2 cursor-pointer"
          onClick={() => props.handleSort('project')}
        >
          Project
        </th>
        <th
          className="px-4 py-2 cursor-pointer"
          onClick={() => props.handleSort('dueDate')}
        >
          Due Date
        </th>
        <th
          className="px-4 py-2 cursor-pointer"
          onClick={() => props.handleSort('status')}
        >
          Status
        </th>
        <th
          className="px-4 py-2 cursor-pointer"
          onClick={() => props.handleSort('priority')}
        >
          Priority
        </th>
        <th
          className="px-4 py-2 cursor-pointer"
          onClick={() => props.handleSort('organisation')}
        >
          Organisation
        </th>
        <th
          className="px-4 py-2 cursor-pointer"
          onClick={() => props.handleSort('taskOwner')}
        >
          Task Owner
        </th>
        <th className="px-4 py-2">Actions</th>
      </tr>
    </thead>
  );
}

export default TaskTableHeader;