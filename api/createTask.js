import { tasks } from '../drizzle/schema.js';
import { authenticateUser, db } from './_apiUtils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);
    const { referenceNumber, description, project, dueDate, status, priority, organisation } = req.body;

    if (!referenceNumber || !description) {
      return res.status(400).json({ error: 'Reference number and description are required' });
    }

    const result = await db.insert(tasks).values({
      referenceNumber,
      description,
      project,
      dueDate,
      status,
      priority,
      owner: user.id,
      organisation
    }).returning();

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error creating task' });
    }
  }
}