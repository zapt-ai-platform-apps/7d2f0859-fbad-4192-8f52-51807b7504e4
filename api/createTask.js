import { tasks } from '../drizzle/schema.js';
import { authenticateUser, db, resend, withSentry } from './_apiUtils.js';

function generateReferenceNumber() {
  // Generate a 7-digit random number as reference number
  const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
  return randomNumber.toString();
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const user = await authenticateUser(req);
  const { description, project, dueDate, status, priority, organisation, taskOwner } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  const referenceNumber = generateReferenceNumber();
  const dueDateValue = dueDate ? new Date(dueDate) : null;

  // Validate dueDate
  if (dueDate && isNaN(dueDateValue.getTime())) {
    throw new Error('Invalid due date format');
  }

  const result = await db.insert(tasks).values({
    referenceNumber,
    description,
    project,
    dueDate: dueDateValue,
    status,
    priority,
    owner: user.id,
    organisation,
    taskOwner
  }).returning();

  res.status(201).json(result[0]);
}

export default withSentry(handler);