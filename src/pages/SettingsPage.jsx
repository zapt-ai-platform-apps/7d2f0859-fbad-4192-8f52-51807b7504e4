import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import LogoUpload from '../components/LogoUpload';
import CustomHeader from '../components/CustomHeader';

function SettingsPage(props) {
  const [logoUrl, setLogoUrl] = useState('');
  const [customHeader, setCustomHeader] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSettings = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    try {
      const response = await fetch('/api/getUserSettings', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setLogoUrl(data.logoUrl || '');
        setCustomHeader(data.customHeader || '');
      } else {
        console.error('Error fetching settings');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSettings = async (logoUrlParam, customHeaderParam) => {
    const { data: { session } } = await supabase.auth.getSession();
    try {
      const response = await fetch('/api/updateUserSettings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          logoUrl: logoUrlParam,
          customHeader: customHeaderParam
        })
      });
      if (!response.ok) {
        console.error('Error updating settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    props.setUser(null);
  };

  const handleBack = () => {
    navigate('/tasks/view');
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Settings</h1>
          <div className="flex space-x-4">
            <button
              className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="bg-danger hover:bg-danger-dark text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="space-y-8">
          <LogoUpload
            logoUrl={logoUrl}
            setLogoUrl={setLogoUrl}
            customHeader={customHeader}
            updateSettings={updateSettings}
            loading={loading}
            setLoading={setLoading}
          />
          <CustomHeader
            customHeader={customHeader}
            setCustomHeader={setCustomHeader}
            updateSettings={updateSettings}
            logoUrl={logoUrl}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
      </div>
      <a
        href="https://www.zapt.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted text-sm mt-8 block text-center hover:underline cursor-pointer"
      >
        Made on ZAPT
      </a>
    </div>
  );
}

export default SettingsPage;