export async function updateTask(accessToken, formData) {
  try {
    const response = await fetch('/api/updateTask', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error('Error updating task: ' + errorData.error);
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteTask(accessToken, taskId) {
  try {
    const response = await fetch('/api/deleteTask', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: taskId })
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error('Error deleting task: ' + errorData.error);
    }
  } catch (error) {
    throw error;
  }
}