import React, { useState, useEffect } from 'react';

function ProjectSelect({ formData, setFormData }) {
  const [projects, setProjects] = useState([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState('');

  useEffect(() => {
    // Fetch existing projects
    fetch('/api/getProjects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const handleProjectChange = (e) => {
    const value = e.target.value;
    if (value === 'add_new') {
      setIsAddingProject(true);
      setFormData({ ...formData, project: '' });
    } else {
      setFormData({ ...formData, project: value });
    }
  };

  const handleAddProject = () => {
    if (newProject.trim() === '') {
      alert('Project name cannot be empty.');
      return;
    }
    setFormData({ ...formData, project: newProject.trim() });
    setProjects([...projects, newProject.trim()]);
    setNewProject('');
    setIsAddingProject(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-muted mb-1" htmlFor="project">
        Project / Category
      </label>
      {!isAddingProject ? (
        <select
          id="project"
          value={formData.project}
          onChange={handleProjectChange}
          className="w-full p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border cursor-pointer"
        >
          <option value="">Select Project / Category</option>
          {projects.map((project, index) => (
            <option key={index} value={project}>
              {project}
            </option>
          ))}
          <option value="add_new">+ Add New Project</option>
        </select>
      ) : (
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
            onClick={() => { setIsAddingProject(false); setNewProject(''); }}
            className="bg-danger hover:bg-danger-dark text-white px-4 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectSelect;