import { initializeZapt } from '@zapt/zapt-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Resend } from 'resend';
import * as Sentry from "@sentry/node";

const sql = postgres(process.env.COCKROACH_DB_URL);
export const db = drizzle(sql);

const { supabase } = initializeZapt(process.env.VITE_PUBLIC_APP_ID);
export const resend = new Resend(process.env.RESEND_API_KEY);

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export async function authenticateUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Missing Authorization header');
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error) {
    throw new Error('Invalid token');
  }

  return user;
}

export function withSentry(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('Error:', error);
      Sentry.captureException(error);
      if (error.message.includes('Authorization') || error.message.includes('token')) {
        res.status(401).json({ error: 'Authentication failed' });
      } else if (error.message.includes('Invalid due date format')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
}