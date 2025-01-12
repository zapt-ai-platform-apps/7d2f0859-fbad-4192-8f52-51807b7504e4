import React, { useState } from 'react';
import EmailTaskFormFields from './EmailTaskFormFields';

function EmailTaskForm({ onSend, onCancel }) {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [comments, setComments] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipientEmail || !senderEmail) {
      alert('Please fill in the required fields (recipient and sender email).');
      return;
    }
    setIsSending(true);
    await onSend(recipientEmail, senderEmail, comments);
    setIsSending(false);
  };

  return (
    <div className="border p-4 mt-2 rounded-lg bg-white">
      <h3 className="text-lg font-bold mb-4 text-primary">Email Task</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <EmailTaskFormFields
          recipientEmail={recipientEmail}
          setRecipientEmail={setRecipientEmail}
          senderEmail={senderEmail}
          setSenderEmail={setSenderEmail}
          comments={comments}
          setComments={setComments}
        />
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSending}
            className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? 'Sending...' : 'Send Task'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-danger hover:bg-danger-dark text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmailTaskForm;