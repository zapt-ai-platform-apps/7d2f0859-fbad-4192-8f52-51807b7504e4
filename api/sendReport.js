import * as Sentry from "@sentry/node";
import { authenticateUser, resend } from './_apiUtils.js';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID,
    },
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);
    const { reportContent, recipientEmail } = req.body;

    if (!recipientEmail || !reportContent) {
      return res.status(400).json({ error: 'Recipient email and report content are required' });
    }

    // Prepare email data
    const emailData = {
      from: 'no-reply@zapt.ai',
      to: recipientEmail,
      subject: 'Task Report',
      text: `Here is the task report:\n\n${reportContent}`,
    };

    // Send email
    await resend.emails.send(emailData);

    res.status(200).json({ message: 'Report sent successfully' });
  } catch (error) {
    console.error('Error sending report:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Error sending report' });
  }
}