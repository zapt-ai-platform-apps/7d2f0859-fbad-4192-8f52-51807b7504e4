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
      from: 'no-reply@listapp.com',
      to: recipientEmail,
      subject: `Task Assignment: ${task.description}`,
      text: `You have been assigned a new task:

Reference Number: ${task.referenceNumber}
Description: ${task.description}
Project: ${task.project || 'N/A'}
Due Date: ${task.dueDate || 'N/A'}
Status: ${task.status || 'N/A'}
Priority: ${task.priority || 'N/A'}
Organisation: ${task.organisation || 'N/A'}

Please log in to view and manage the task.`,
    };

    // Send email
    await resend.emails.send(emailData);

    res.status(200).json({ message: 'Task allocated successfully' });
  } catch (error) {
    console.error('Error allocating task:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Error allocating task' });
  }
}