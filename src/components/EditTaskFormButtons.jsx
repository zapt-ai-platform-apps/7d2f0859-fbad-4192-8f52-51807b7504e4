import React from 'react';

function EditTaskFormButtons({ loading, handleDelete, onCancel }) {
  return (
    <div className="flex space-x-4">
      <button
        type="submit"
        className={`flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={loading}
      >
        {loading ? 'Updating Task...' : 'Update Task'}
      </button>
      <button
        type="button"
        className="flex-1 px-6 py-3 bg-muted text-white rounded-lg hover:bg-muted-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        type="button"
        className={`flex-1 px-6 py-3 bg-danger text-white rounded-lg hover:bg-danger-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? 'Deleting...' : 'Delete Task'}
      </button>
    </div>
  );
}

export default EditTaskFormButtons;