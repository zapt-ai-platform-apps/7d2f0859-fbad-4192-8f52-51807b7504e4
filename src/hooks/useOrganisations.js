import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function useOrganisations() {
  const [organisations, setOrganisations] = useState([]);

  useEffect(() => {
    const fetchOrganisations = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
        return;
      }

      if (session && session.access_token) {
        try {
          const response = await fetch('/api/getOrganisations', {
            headers: {
              'Authorization': `Bearer ${session.access_token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setOrganisations(data);
          } else {
            const errorData = await response.json();
            console.error('Error fetching organisations:', errorData.error);
          }
        } catch (error) {
          console.error('Error fetching organisations:', error);
        }
      }
    };

    fetchOrganisations();
  }, []);

  return [organisations, setOrganisations];
}

export default useOrganisations;