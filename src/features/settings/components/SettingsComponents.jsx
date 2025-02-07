import React, { useState } from 'react';

export function LogoUpload({ logoUrl, customHeader, updateSettings }) {
  const [newLogoUrl, setNewLogoUrl] = useState(logoUrl);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(newLogoUrl, customHeader);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold">Logo Upload</h2>
      <input
        type="text"
        value={newLogoUrl}
        onChange={(e) => setNewLogoUrl(e.target.value)}
        placeholder="Enter new logo URL"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition duration-300"
      >
        Update Logo
      </button>
    </form>
  );
}

export function CustomHeader({ logoUrl, customHeader, updateSettings }) {
  const [newCustomHeader, setNewCustomHeader] = useState(customHeader);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(logoUrl, newCustomHeader);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold">Custom Header</h2>
      <input
        type="text"
        value={newCustomHeader}
        onChange={(e) => setNewCustomHeader(e.target.value)}
        placeholder="Enter custom header text"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition duration-300"
      >
        Update Header
      </button>
    </form>
  );
}