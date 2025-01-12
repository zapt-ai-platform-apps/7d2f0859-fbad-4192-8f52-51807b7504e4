import { tasks } from '../../drizzle/schema.js';
import { db } from '../_apiUtils.js';
import { eq, and } from 'drizzle-orm';

export async function fetchTask(taskId, userId) {
  const [task] = await db.select().from(tasks).where(
    and(
      eq(tasks.id, taskId),
      eq(tasks.owner, userId)
    )
  );
  return task;
}