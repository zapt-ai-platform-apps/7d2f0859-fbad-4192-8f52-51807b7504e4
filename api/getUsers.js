import { createClient } from '@supabase/supabase-js';
import { authenticateUser, withSentry } from './_apiUtils.js';

async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Ensure the request is authenticated
  await authenticateUser(req);

  // Initialize Supabase admin client using service role key
  const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    throw new Error(error.message);
  }

  res.status(200).json(data.users);
}

export default withSentry(handler);