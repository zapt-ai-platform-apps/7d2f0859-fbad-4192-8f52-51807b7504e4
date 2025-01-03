import { authenticateUser, db, withSentry } from './_apiUtils.js';
import { userSettings } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const user = await authenticateUser(req);
  const { logoUrl, customHeader } = req.body;

  const [existingSettings] = await db.select()
    .from(userSettings)
    .where(eq(userSettings.userId, user.id));

  if (existingSettings) {
    await db.update(userSettings)
      .set({ logoUrl, customHeader })
      .where(eq(userSettings.userId, user.id));
  } else {
    await db.insert(userSettings).values({
      userId: user.id,
      logoUrl,
      customHeader
    });
  }

  res.status(200).json({ message: 'Settings updated successfully' });
}

export default withSentry(handler);