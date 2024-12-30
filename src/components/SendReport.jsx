import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function SendReport(props) {
  const [sendingReport, setSendingReport] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');

  const handleSendReport = async () => {
    if (!recipientEmail) {
      alert('Please enter a recipient email');
      return;
    }
    setSendingReport(true);
    const { data: { session } } = await supabase.auth.getSession();
    try {
      const response = await fetch('/api/sendReport', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportContent: props.reportContent,
          recipientEmail: recipientEmail,
        }),
      });

      if (response.ok) {
        alert('Report sent successfully');
        setRecipientEmail('');
      } else {
        const errorData = await response.json();
        alert('Error sending report: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error sending report:', error);
      alert('Error sending report');
    } finally {
      setSendingReport(false);
    }
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="email"
        placeholder="Recipient Email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
        className="flex-1 p-3 border border-muted rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border"
      />
      <button
        onClick={handleSendReport}
        className={`bg-secondary text-white p-3 rounded-r-lg hover:bg-secondary-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={sendingReport}
      >
        {sendingReport ? 'Sending...' : 'Send Report'}
      </button>
    </div>
  );
}

export default SendReport;