export async function fetchUsers(supabase) {
  const { data: { session } } = await supabase.auth.getSession();
  const response = await fetch('/api/getUsers', {
    headers: {
      Authorization: `Bearer ${session.access_token}`
    }
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    console.error('Error fetching users:', errorData.error);
    throw new Error(errorData.error);
  }
}