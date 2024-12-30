import * as Sentry from "@sentry/node";
import { authenticateUser, db, resend } from './_apiUtils.js';
import { tasks } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID,
    },
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);
    const { taskId, recipientEmail } = req.body;

    if (!taskId || !recipientEmail) {
      return res.status(400).json({ error: 'Task ID and recipient email are required' });
    }

    // Fetch task
    const [task] = await db.select().from(tasks).where(eq(tasks.id, taskId), eq(tasks.owner, user.id));

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Prepare email data
    const emailData = {
      from: 'no-reply@zapt.ai',
      to: recipientEmail,
      subject: `Task Details: ${task.description}`,
      text: `Here are the details of the task:

Reference Number: ${task.referenceNumber}
Description: ${task.description}
Project: ${task.project || 'N/A'}
Due Date: ${task.dueDate ? task.dueDate.toISOString().split('T')[0] : 'N/A'}
Status: ${task.status || 'N/A'}
Priority: ${task.priority || 'N/A'}
Organisation: ${task.organisation || 'N/A'}
Task Owner: ${task.taskOwner || 'N/A'}

Please contact the task owner for more details.`,
    };

    // Send email
    await resend.emails.send(emailData);

    res.status(200).json({ message: 'Task emailed successfully' });
  } catch (error) {
    console.error('Error emailing task:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Error emailing task' });
  }
}