import { authenticateUser, db, withSentry } from './_apiUtils.js';
import { reports } from '../drizzle/schema.js';
import { eq, desc } from 'drizzle-orm';

async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const user = await authenticateUser(req);

  const result = await db.select()
    .from(reports)
    .where(eq(reports.userId, user.id))
    .orderBy(desc(reports.createdAt));

  res.status(200).json(result);
}

export default withSentry(handler);