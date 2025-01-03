import { authenticateUser, db, withSentry } from './_apiUtils.js';
import { userSettings } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const user = await authenticateUser(req);

  const [settings] = await db.select()
    .from(userSettings)
    .where(eq(userSettings.userId, user.id));

  res.status(200).json(settings || {});
}

export default withSentry(handler);