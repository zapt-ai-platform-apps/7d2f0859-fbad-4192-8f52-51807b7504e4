CREATE TABLE "user_settings" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "logo_url" TEXT,
  "custom_header" TEXT
);