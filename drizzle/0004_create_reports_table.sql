CREATE TABLE "reports" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "content" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);