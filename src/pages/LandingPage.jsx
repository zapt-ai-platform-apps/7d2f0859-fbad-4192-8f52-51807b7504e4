import { Link } from '@solidjs/router';

function LandingPage() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-purple-600">List App</h1>
          <nav>
            <Link href="/login" class="text-purple-600 hover:text-purple-800 font-semibold transition duration-300 ease-in-out cursor-pointer">
              Sign In
            </Link>
          </nav>
        </div>
      </header>
      <main class="flex-grow flex items-center justify-center">
        <div class="text-center px-4">
          <h2 class="text-5xl font-bold mb-6 text-purple-600">Manage Your Tasks Efficiently</h2>
          <p class="text-xl text-gray-700 mb-8">
            List App helps you keep track of your tasks and actions,
            allocate tasks to others, and generate insightful reports.
          </p>
          <Link href="/login">
            <button class="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </main>
      <footer class="bg-white py-4">
        <div class="text-center">
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" class="text-gray-500 text-sm">
            Made on ZAPT
          </a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;