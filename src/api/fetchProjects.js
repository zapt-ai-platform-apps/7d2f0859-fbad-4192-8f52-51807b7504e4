import { supabase } from '../supabaseClient';

async function fetchProjects() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error);
    return [];
  }

  if (session && session.access_token) {
    try {
      const response = await fetch('/api/getProjects', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        console.error('Error fetching projects:', errorData.error);
        return [];
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  } else {
    return [];
  }
}

export default fetchProjects;