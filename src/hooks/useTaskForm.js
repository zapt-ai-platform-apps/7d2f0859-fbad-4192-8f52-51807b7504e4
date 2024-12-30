import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function useTaskForm(onTaskCreated) {
  const [formData, setFormData] = useState({
    description: '',
    project: '',
    dueDate: '',
    status: 'Open',
    priority: 'Normal',
    organisation: '',
    taskOwner: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Autofill project and organisation fields from localStorage
    const savedProject = localStorage.getItem('lastProject') || '';
    const savedOrganisation = localStorage.getItem('lastOrganisation') || '';
    setFormData(prevData => ({
      ...prevData,
      project: savedProject,
      organisation: savedOrganisation,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const adjustedFormData = { ...formData };
    if (adjustedFormData.dueDate === '') {
      adjustedFormData.dueDate = null;
    }

    // Save project and organisation to localStorage
    localStorage.setItem('lastProject', adjustedFormData.project);
    localStorage.setItem('lastOrganisation', adjustedFormData.organisation);

    const { data: { session } } = await supabase.auth.getSession();
    try {
      const response = await fetch('/api/createTask', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adjustedFormData)
      });
      if (response.ok) {
        const newTask = await response.json();
        onTaskCreated(newTask);
        setFormData({
          description: '',
          project: adjustedFormData.project,
          dueDate: '',
          status: 'Open',
          priority: 'Normal',
          organisation: adjustedFormData.organisation,
          taskOwner: '',
        });
      } else {
        console.error('Error creating task:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    loading,
  };
}

export default useTaskForm;