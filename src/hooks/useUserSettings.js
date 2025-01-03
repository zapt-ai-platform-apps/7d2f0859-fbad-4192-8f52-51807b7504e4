import { useState } from 'react';
import { supabase } from '../supabaseClient';

function useUserSettings() {
  const [logoUrl, setLogoUrl] = useState('');
  const [customHeader, setCustomHeader] = useState('');

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

  return { logoUrl, customHeader, fetchSettings };
}

export default useUserSettings;