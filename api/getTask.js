import { tasks } from '../drizzle/schema.js';
import { authenticateUser, db, withSentry } from './_apiUtils.js';
import { eq, and } from 'drizzle-orm';

async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const user = await authenticateUser(req);
  const taskId = req.query.id;

  if (!taskId) {
    return res.status(400).json({ error: 'Task ID is required' });
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

  res.status(200).json(task);
}

export default withSentry(handler);