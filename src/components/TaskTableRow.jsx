import React from 'react';
import { format } from 'date-fns';

function TaskTableRow(props) {
  const { task, handleEmailTask, emailingTaskId, onEditTask } = props;

  return (
    <tr className="hover:bg-gray-100">
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
          className={`bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition duration-300 ease-in-out cursor-pointer ${emailingTaskId === task.id ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleEmailTask(task.id)}
          disabled={emailingTaskId === task.id}
        >
          {emailingTaskId === task.id ? 'Emailing...' : 'Email To'}
        </button>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 ease-in-out cursor-pointer"
          onClick={() => onEditTask(task)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

export default TaskTableRow;