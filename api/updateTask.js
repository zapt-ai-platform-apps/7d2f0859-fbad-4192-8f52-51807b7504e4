import * as Sentry from "@sentry/node";
import { authenticateUser, db } from './_apiUtils.js';
import { tasks } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

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

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);
    const { id, ...updatedFields } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Task ID is required' });
    }

    // Ensure the task belongs to the user
    const [existingTask] = await db.select().from(tasks).where(eq(tasks.id, id), eq(tasks.owner, user.id));

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task
    const [updatedTask] = await db.update(tasks)
      .set({
        ...updatedFields,
        updatedAt: new Date()
      })
      .where(eq(tasks.id, id))
      .returning();

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Error updating task' });
  }
}