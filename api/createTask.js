import * as Sentry from "@sentry/node";
import { tasks } from '../drizzle/schema.js';
import { authenticateUser, db } from './_apiUtils.js';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

function generateReferenceNumber() {
  // Generate a 7-digit random number as reference number
  const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
  return randomNumber.toString();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);
    const { description, project, dueDate, status, priority, organisation, taskOwner } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const referenceNumber = generateReferenceNumber();
    const dueDateValue = dueDate ? new Date(dueDate) : null;

    const result = await db.insert(tasks).values({
      referenceNumber,
      description,
      project,
      dueDate: dueDateValue,
      status,
      priority,
      owner: user.id,
      organisation,
      taskOwner
    }).returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    Sentry.captureException(error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error creating task' });
    }
  }
}