import React from 'react';

function CustomHeader({ customHeader, setCustomHeader, updateSettings, logoUrl, loading, setLoading }) {
  const handleSaveSettings = async () => {
    setLoading(true);
    await updateSettings(logoUrl, customHeader);
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Custom Report Header</h2>
      <textarea
        value={customHeader}
        onChange={(e) => setCustomHeader(e.target.value)}
        placeholder="Enter custom header content"
        className="w-full p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border h-32"
      />
      <button
        onClick={handleSaveSettings}
        className={`mt-4 bg-primary text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Settings'}
      </button>
    </div>
  );
}

export default CustomHeader;