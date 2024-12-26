import { createSignal } from 'solid-js';
import { supabase } from '../supabaseClient';
import TaskFormFields from './TaskFormFields';

function EditTaskForm(props) {
  const [formData, setFormData] = createSignal({ ...props.task });
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const adjustedFormData = { ...formData(), id: props.task.id };
    if (adjustedFormData.dueDate === '') {
      adjustedFormData.dueDate = null;
    }

    const { data: { session } } = await supabase.auth.getSession();
    try {
      const response = await fetch('/api/updateTask', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adjustedFormData)
      });
      if (response.ok) {
        const updatedTask = await response.json();
        props.onTaskUpdated(updatedTask);
      } else {
        console.error('Error updating task:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4 mb-8">
      <h2 class="text-2xl font-bold mb-4 text-purple-600">Edit Task</h2>
      <TaskFormFields formData={formData} setFormData={setFormData} />
      <div class="flex space-x-4">
        <button
          type="submit"
          class={`flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading()}
        >
          {loading() ? 'Updating Task...' : 'Update Task'}
        </button>
        <button
          type="button"
          class="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={props.onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm;