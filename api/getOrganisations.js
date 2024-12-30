import { authenticateUser, db, withSentry } from './_apiUtils.js';
import { distinct } from 'drizzle-orm';

async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);
    
    const organisations = await db.select({ organisation: db.raw('DISTINCT organisation') })
                                  .from('tasks')
                                  .where({ owner: user.id })
                                  .execute();

    const organisationList = organisations.map(item => item.organisation).filter(o => o);

    res.status(200).json(organisationList);
  } catch (error) {
    console.error('Error fetching organisations:', error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error fetching organisations' });
    }
  }
}

export default withSentry(handler);