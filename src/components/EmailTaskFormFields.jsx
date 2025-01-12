import React from 'react';

function EmailTaskFormFields({
  recipientEmail,
  setRecipientEmail,
  senderEmail,
  setSenderEmail,
  comments,
  setComments,
}) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-muted mb-1" htmlFor="recipientEmail">
          Recipient Email
        </label>
        <input
          id="recipientEmail"
          type="email"
          placeholder="Recipient Email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          className="w-full p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted mb-1" htmlFor="senderEmail">
          Your Email
        </label>
        <input
          id="senderEmail"
          type="email"
          placeholder="Your Email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          className="w-full p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted mb-1" htmlFor="comments">
          Comments (Optional)
        </label>
        <textarea
          id="comments"
          placeholder="Enter any additional comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border h-24"
        />
      </div>
    </>
  );
}

export default EmailTaskFormFields;