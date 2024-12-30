import React from 'react';

function ProjectAdd({ newProject, setNewProject, handleAddProject, setIsAddingProject }) {
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={newProject}
        onChange={(e) => setNewProject(e.target.value)}
        placeholder="Enter new project"
        className="flex-1 p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border"
      />
      <button
        type="button"
        onClick={handleAddProject}
        className="bg-secondary hover:bg-secondary-dark text-white px-4 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Add
      </button>
      <button
        type="button"
        onClick={() => {
          setIsAddingProject(false);
          setNewProject('');
        }}
        className="bg-danger hover:bg-danger-dark text-white px-4 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Cancel
      </button>
    </div>
  );
}

export default ProjectAdd;