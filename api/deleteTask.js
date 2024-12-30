import { tasks } from '../drizzle/schema.js';
import { authenticateUser, db, withSentry } from './_apiUtils.js';
import { eq, and } from 'drizzle-orm';

async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const user = await authenticateUser(req);
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Task ID is required' });
  }

  // Ensure the task belongs to the user
  const [existingTask] = await db.select().from(tasks).where(
    and(
      eq(tasks.id, id),
      eq(tasks.owner, user.id)
    )
  );

  if (!existingTask) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Delete the task
  await db.delete(tasks)
    .where(eq(tasks.id, id));

  res.status(200).json({ message: 'Task deleted successfully' });
}

export default withSentry(handler);