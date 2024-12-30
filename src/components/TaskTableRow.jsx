import React from 'react';
import { format } from 'date-fns';

function TaskTableRow(props) {
  const { task, handleEmailTask, emailingTaskId, onEditTask } = props;

  return (
    <tr className="hover:bg-gray-light">
      <td className="border px-4 py-2">{task.referenceNumber}</td>
      <td className="border px-4 py-2">{task.description}</td>
      <td className="border px-4 py-2">{task.project}</td>
      <td className="border px-4 py-2">
        {task.dueDate ? format(new Date(task.dueDate), 'dd/MM/yy') : ''}
      </td>
      <td className="border px-4 py-2">{task.status}</td>
      <td className="border px-4 py-2">{task.priority}</td>
      <td className="border px-4 py-2">{task.organisation}</td>
      <td className="border px-4 py-2">{task.taskOwner || 'Unassigned'}</td>
      <td className="border px-4 py-2 flex space-x-2">
        <button
          className={`bg-success text-white px-2 py-1 rounded hover:bg-success-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${emailingTaskId === task.id ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleEmailTask(task.id)}
          disabled={emailingTaskId === task.id}
        >
          {emailingTaskId === task.id ? 'Emailing...' : 'Email To'}
        </button>
        <button
          className="bg-primary text-white px-2 py-1 rounded hover:bg-primary-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={() => onEditTask(task)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

export default TaskTableRow;