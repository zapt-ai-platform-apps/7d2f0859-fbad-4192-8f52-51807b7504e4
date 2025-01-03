import React from 'react';
import { supabase } from '../supabaseClient';

function LogoUpload({ logoUrl, setLogoUrl, customHeader, updateSettings, loading, setLoading }) {
  const [logoFile, setLogoFile] = React.useState(null);

  const handleLogoUpload = async () => {
    if (!logoFile) return;
    setLoading(true);
    const { data, error } = await supabase.storage
      .from('logos')
      .upload(`public/${logoFile.name}`, logoFile, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Error uploading logo:', error);
      setLoading(false);
      return;
    }

    const logoPublicUrl = supabase.storage
      .from('logos')
      .getPublicUrl(`public/${logoFile.name}`);

    await updateSettings(logoPublicUrl.publicURL, customHeader);
    setLogoUrl(logoPublicUrl.publicURL);
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upload Organisation Logo</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setLogoFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleLogoUpload}
        className={`bg-primary text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={loading || !logoFile}
      >
        {loading ? 'Uploading...' : 'Upload Logo'}
      </button>
      {logoUrl && (
        <div className="mt-4">
          <p className="text-muted mb-2">Current Logo:</p>
          <img src={logoUrl} alt="Organisation Logo" className="h-32" />
        </div>
      )}
    </div>
  );
}

export default LogoUpload;