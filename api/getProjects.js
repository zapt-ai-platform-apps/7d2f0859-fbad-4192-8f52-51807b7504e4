import { authenticateUser, db, withSentry } from './_apiUtils.js';
import { eq } from 'drizzle-orm';
import { tasks } from '../drizzle/schema.js';

async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);

    const projects = await db
      .select({
        project: tasks.project,
      })
      .from(tasks)
      .where(eq(tasks.owner, user.id))
      .groupBy(tasks.project)
      .execute();

    const projectList = projects.map(item => item.project).filter(p => p);

    res.status(200).json(projectList);
  } catch (error) {
    console.error('Error fetching projects:', error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error fetching projects' });
    }
  }
}

export default withSentry(handler);