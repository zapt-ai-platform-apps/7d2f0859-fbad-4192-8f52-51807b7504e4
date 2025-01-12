import { resend } from '../_apiUtils.js';

export async function sendEmailToRecipient(task, senderEmail, recipientEmail, comments) {
  const emailText = `
You have been sent a task from ${senderEmail} via the administrate.co.uk system.
Comments: ${comments || ''}

Here are the task details:

Reference Number: ${task.referenceNumber}
Description: ${task.description}
Project: ${task.project || 'N/A'}
Due Date: ${task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : 'N/A'}
Status: ${task.status || 'N/A'}
Priority: ${task.priority || 'N/A'}
Organisation: ${task.organisation || 'N/A'}
Task Owner: ${task.taskOwner || 'N/A'}
  `;

  const emailData = {
    from: 'no-reply@zapt.ai',
    to: recipientEmail,
    subject: `Task Details: ${task.description}`,
    text: emailText,
  };

  await resend.emails.send(emailData);
}

export async function sendCopyEmailToSender(task, senderEmail, recipientEmail, comments) {
  const copyEmailText = `
You have sent a task to ${recipientEmail} via the administrate.co.uk system.
Comments: ${comments || ''}

Here are the task details:

Reference Number: ${task.referenceNumber}
Description: ${task.description}
Project: ${task.project || 'N/A'}
Due Date: ${task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : 'N/A'}
Status: ${task.status || 'N/A'}
Priority: ${task.priority || 'N/A'}
Organisation: ${task.organisation || 'N/A'}
Task Owner: ${task.taskOwner || 'N/A'}
  `;

  const copyEmailData = {
    from: 'no-reply@zapt.ai',
    to: senderEmail,
    subject: `Copy of Task Details: ${task.description}`,
    text: copyEmailText,
  };

  await resend.emails.send(copyEmailData);
}