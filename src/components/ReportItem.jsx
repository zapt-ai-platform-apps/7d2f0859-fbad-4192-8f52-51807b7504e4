import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import printReport from '../utils/printReport';

function ReportItem({ report }) {
  const [sending, setSending] = useState(false);

  const handlePrint = () => {
    printReport(report.content, false);
  };

  const handleShare = async () => {
    const email = prompt('Enter recipient email:');
    if (!email) return;

    setSending(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    try {
      const response = await fetch('/api/sendReport', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportContent: report.content,
          recipientEmail: email,
        }),
      });
      if (response.ok) {
        alert('Report sent successfully');
      } else {
        const errorData = await response.json();
        alert('Error sending report: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error sending report:', error);
      alert('Error sending report');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        Report from {new Date(report.createdAt).toLocaleString()}
      </h2>
      <div
        className="report-content overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: report.content }}
      />
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handlePrint}
          className="bg-muted hover:bg-muted-dark text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          Print Report
        </button>
        <button
          onClick={handleShare}
          disabled={sending}
          className={`bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${sending ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {sending ? 'Sending...' : 'Share Report'}
        </button>
      </div>
    </div>
  );
}

export default ReportItem;