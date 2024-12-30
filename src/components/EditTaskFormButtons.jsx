import React from 'react';

function EditTaskFormButtons({ loading, handleDelete, onCancel }) {
  return (
    <div className="flex space-x-4">
      <button
        type="submit"
        className={`flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Updating Task...' : 'Update Task'}
      </button>
      <button
        type="button"
        className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        type="button"
        className={`flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? 'Deleting...' : 'Delete Task'}
      </button>
    </div>
  );
}

export default EditTaskFormButtons;