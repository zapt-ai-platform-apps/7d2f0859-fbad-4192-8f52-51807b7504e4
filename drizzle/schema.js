import { pgTable, serial, text, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  referenceNumber: varchar('reference_number', { length: 10 }).notNull(),
  description: text('description').notNull(),
  project: varchar('project', { length: 255 }),
  dueDate: timestamp('due_date', { withTimezone: true }),
  status: varchar('status', { length: 20 }),
  priority: varchar('priority', { length: 10 }),
  owner: uuid('owner').notNull(),
  organisation: varchar('organisation', { length: 255 }),
  allocatedTo: varchar('allocated_to', { length: 255 }),
  taskOwner: varchar('task_owner', { length: 255 }), // New field
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow()
});