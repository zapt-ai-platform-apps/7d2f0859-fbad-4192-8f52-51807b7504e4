import { supabase } from '../supabaseClient';

export async function emailTask(taskId, recipientEmail, senderEmail, comments) {
  console.info('[emailTask] Sending email for taskId:', taskId);

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      alert('No user session found, please log in again.');
      return;
    }

    const response = await fetch('/api/emailTask', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskId,
        recipientEmail,
        senderEmail,
        comments,
      }),
    });

    if (response.ok) {
      alert('Task emailed successfully');
    } else {
      const errorData = await response.json();
      alert('Error emailing task: ' + errorData.error);
    }
  } catch (error) {
    console.error('Error emailing task:', error);
    alert('Error emailing task: ' + error.message);
  }
}