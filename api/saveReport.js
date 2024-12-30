import { authenticateUser, db, withSentry } from './_apiUtils.js';
import { reports } from '../drizzle/schema.js';

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);
    const { reportContent } = req.body;

    if (!reportContent) {
      return res.status(400).json({ error: 'Report content is required' });
    }

    const newReport = await db.insert(reports).values({
      userId: user.id,
      content: reportContent,
      createdAt: new Date(),
    }).returning();

    res.status(201).json(newReport[0]);
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ error: 'Error saving report' });
  }
}

export default withSentry(handler);