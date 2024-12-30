import { tasks } from '../drizzle/schema.js';
import { authenticateUser, db, withSentry } from './_apiUtils.js';
import { eq, and } from 'drizzle-orm';

async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const user = await authenticateUser(req);
  const { id, ...updatedFields } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Task ID is required' });
  }

  // Ensure the task belongs to the user
  const [existingTask] = await db.select().from(tasks).where(
    and(
      eq(tasks.id, id),
      eq(tasks.owner, user.id)
    )
  );

  if (!existingTask) {
    return res.status(404).json({ error: 'Task not found' });
  }

  // Remove fields that are not in the database schema
  const allowedFields = [
    'referenceNumber',
    'description',
    'project',
    'dueDate',
    'status',
    'priority',
    'organisation',
    'taskOwner'
  ];
  const updateData = {};
  allowedFields.forEach(field => {
    if (field in updatedFields) {
      updateData[field] = updatedFields[field] === '' ? null : updatedFields[field];
    }
  });

  // Validate dueDate
  if (updateData.dueDate) {
    const dueDate = new Date(updateData.dueDate);
    if (isNaN(dueDate.getTime())) {
      throw new Error('Invalid due date format');
    }
    updateData.dueDate = dueDate;
  }

  // Update the task
  const [updatedTask] = await db.update(tasks)
    .set({
      ...updateData,
      updatedAt: new Date()
    })
    .where(eq(tasks.id, id))
    .returning();

  res.status(200).json(updatedTask);
}

export default withSentry(handler);