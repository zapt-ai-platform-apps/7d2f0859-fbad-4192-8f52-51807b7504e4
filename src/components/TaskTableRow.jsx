import React, { useState } from 'react';
import { format } from 'date-fns';
import PriorityDisplay from './PriorityDisplay';
import EmailTaskForm from './EmailTaskForm';
import { emailTask } from '../utils/emailTask';

function TaskTableRow(props) {
  const { task, onEditTask } = props;
  const [showEmailForm, setShowEmailForm] = useState(false);

  const handleEmailClick = () => {
    setShowEmailForm(!showEmailForm);
  };

  const handleSendEmail = async (recipientEmail, senderEmail, comments) => {
    await emailTask(task.id, recipientEmail, senderEmail, comments);
    setShowEmailForm(false);
  };

  return (
    <React.Fragment>
      <tr className="hover:bg-muted-light">
        <td className="border px-4 py-2">{task.referenceNumber}</td>
        <td className="border px-4 py-2">{task.description}</td>
        <td className="border px-4 py-2">{task.project}</td>
        <td className="border px-4 py-2">
          {task.dueDate ? format(new Date(task.dueDate), 'dd/MM/yy') : ''}
        </td>
        <td className="border px-4 py-2">{task.status}</td>
        <td className="border px-4 py-2">
          <PriorityDisplay value={task.priority} />
        </td>
        <td className="border px-4 py-2">{task.taskOwner || 'Unassigned'}</td>
        <td className="border px-4 py-2">{task.organisation}</td>
        <td className="border px-4 py-2 flex space-x-2">
          <button
            className="flex-1 bg-secondary text-white px-2 py-1 rounded hover:bg-secondary-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={handleEmailClick}
          >
            {showEmailForm ? 'Close' : 'Email'}
          </button>
          <button
            className="flex-1 bg-primary text-white px-2 py-1 rounded hover:bg-primary-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={() => onEditTask(task)}
          >
            Edit
          </button>
        </td>
      </tr>
      {showEmailForm && (
        <tr>
          <td colSpan="9" className="border-b-0 bg-background">
            <EmailTaskForm onSend={handleSendEmail} onCancel={() => setShowEmailForm(false)} />
          </td>
        </tr>
      )}
    </React.Fragment>
  );
}

export default TaskTableRow;