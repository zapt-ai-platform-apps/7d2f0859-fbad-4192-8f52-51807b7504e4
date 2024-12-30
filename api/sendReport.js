import { authenticateUser, resend, withSentry } from './_apiUtils.js';

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

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
}

export default withSentry(handler);