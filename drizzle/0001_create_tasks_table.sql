CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "reference_number" VARCHAR(10) NOT NULL,
  "description" TEXT NOT NULL,
  "project" VARCHAR(255),
  "due_date" TIMESTAMP,
  "status" VARCHAR(20),
  "priority" VARCHAR(10),
  "owner" UUID NOT NULL,
  "organisation" VARCHAR(255),
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

CREATE UNIQUE INDEX tasks_reference_number_idx ON tasks(reference_number, owner);