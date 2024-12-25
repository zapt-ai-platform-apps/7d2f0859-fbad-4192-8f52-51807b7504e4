import { createSignal, onMount } from 'solid-js';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { supabase } from '../supabaseClient';

function HomePage(props) {
  const user = props.user;
  const [tasks, setTasks] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const fetchTasks = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    try {
      const response = await fetch('/api/getTasks', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (response.ok) {
        const fetchedTasks = await response.json();
        setTasks(fetchedTasks);
      } else {
        console.error('Error fetching tasks:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  onMount(fetchTasks);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks(), newTask]);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    user(null);
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-4xl font-bold text-purple-600">List App</h1>
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
        <TaskForm onTaskCreated={handleTaskCreated} />
        <TaskList tasks={tasks()} loading={loading()} />
      </div>
      <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" class="text-gray-500 text-sm mt-8 block text-center">
        Made on ZAPT
      </a>
    </div>
  );
}

export default HomePage;