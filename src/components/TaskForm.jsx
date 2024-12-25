import { createSignal } from 'solid-js';
import { supabase } from '../supabaseClient';
import TaskFormFields from './TaskFormFields';

function TaskForm(props) {
  const [formData, setFormData] = createSignal({
    referenceNumber: '',
    description: '',
    project: '',
    dueDate: '',
    status: '',
    priority: 'Normal',
    organisation: ''
  });
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const adjustedFormData = { ...formData() };
    if (adjustedFormData.dueDate === '') {
      adjustedFormData.dueDate = null;
    }

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
        props.onTaskCreated(newTask);
        setFormData({
          referenceNumber: '',
          description: '',
          project: '',
          dueDate: '',
          status: '',
          priority: 'Normal',
          organisation: ''
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

  return (
    <form onSubmit={handleSubmit} class="space-y-4 mb-8">
      <TaskFormFields formData={formData} setFormData={setFormData} />
      <button
        type="submit"
        class={`w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading()}
      >
        {loading() ? 'Creating Task...' : 'Create Task'}
      </button>
    </form>
  );
}

export default TaskForm;