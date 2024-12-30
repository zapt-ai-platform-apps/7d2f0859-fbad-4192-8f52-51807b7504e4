import { tasks } from '../drizzle/schema.js';
import { authenticateUser, db, withSentry } from './_apiUtils.js';
import { eq, asc } from 'drizzle-orm';

async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const user = await authenticateUser(req);

  const result = await db.select()
    .from(tasks)
    .where(eq(tasks.owner, user.id))
    .orderBy(asc(tasks.dueDate));

  res.status(200).json(result);
}

export default withSentry(handler);