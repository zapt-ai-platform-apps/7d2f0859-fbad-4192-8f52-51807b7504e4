import * as Sentry from "@sentry/node";
import { authenticateUser, db, resend } from './_apiUtils.js';
import { tasks } from '../drizzle/schema.js';
import { ilike, eq } from 'drizzle-orm';

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
    const { filterField, filterText, recipientEmail } = req.body;

    if (!recipientEmail) {
      return res.status(400).json({ error: 'Recipient email is required' });
    }

    // Fetch filtered tasks
    let query = db.select().from(tasks).where(eq(tasks.owner, user.id));

    if (filterText && filterField) {
      query = query.where(ilike(tasks[filterField], `%${filterText}%`));
    }

    const taskList = await query;

    if (!taskList.length) {
      return res.status(400).json({ error: 'No tasks found for the given filter' });
    }

    // Generate report content
    const reportContent = taskList.map((task) => {
      return `
Reference Number: ${task.referenceNumber}
Description: ${task.description}
Project: ${task.project || 'N/A'}
Due Date: ${task.dueDate || 'N/A'}
Status: ${task.status || 'N/A'}
Priority: ${task.priority || 'N/A'}
Organisation: ${task.organisation || 'N/A'}
`;
    }).join('\n');

    // Prepare email data
    const emailData = {
      from: 'no-reply@zapt.ai',
      to: recipientEmail,
      subject: 'Task Report',
      text: `Here is the task report:\n\n${reportContent}`,
    };

    // Send email
    await resend.emails.send(emailData);

    res.status(200).json({ message: 'Report sent successfully' });
  } catch (error) {
    console.error('Error sending report:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Error sending report' });
  }
}