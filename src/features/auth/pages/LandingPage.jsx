import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

function LandingPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {user && <Navigate to="/tasks/view" />}
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Administrate</h1>
            <nav>
              <Link to="/login" className="text-primary hover:text-primary-dark font-semibold transition duration-300 ease-in-out cursor-pointer">
                Sign In
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center px-4">
            <h2 className="text-5xl font-bold mb-6 text-primary">Manage Your Tasks Efficiently</h2>
            <p className="text-xl text-muted mb-8">
              Administrate helps you keep track of your tasks and actions,
              allocate tasks to others, and generate insightful reports.
            </p>
            <Link to="/login">
              <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                Get Started
              </button>
            </Link>
          </div>
        </main>
        <footer className="bg-white py-4">
          <div className="text-center">
            <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-muted text-sm hover:underline cursor-pointer">
              Made on ZAPT
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default LandingPage;