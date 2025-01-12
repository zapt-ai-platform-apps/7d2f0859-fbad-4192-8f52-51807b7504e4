import { tasks } from '../drizzle/schema.js';
import { authenticateUser, db, resend, withSentry } from './_apiUtils.js';
import { eq, and } from 'drizzle-orm';

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const user = await authenticateUser(req);
  const { taskId, recipientEmail, senderEmail, comments } = req.body;

  if (!taskId || !recipientEmail || !senderEmail) {
    return res.status(400).json({ error: 'Task ID, recipient email, and sender email are required' });
  }

  // Fetch task
  const [task] = await db.select().from(tasks).where(
    and(
      eq(tasks.id, taskId),
      eq(tasks.owner, user.id)
    )
  );

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Prepare email data
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
    to: [recipientEmail],
    cc: [senderEmail],
    subject: `Task Details: ${task.description}`,
    text: emailText,
  };

  // Send email
  await resend.emails.send(emailData);

  res.status(200).json({ message: 'Task emailed successfully' });
}

export default withSentry(handler);