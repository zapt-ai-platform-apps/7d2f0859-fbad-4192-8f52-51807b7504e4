import React from 'react';
import { Link } from 'react-router-dom';

function Header({ onSignOut }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold text-primary">View Reports</h1>
      <div className="flex space-x-4">
        <Link
          to="/tasks/view"
          className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-secondary transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        >
          View Tasks
        </Link>
        <button
          className="bg-danger hover:bg-danger-dark text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-danger transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={onSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Header;