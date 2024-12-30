import React, { useState, useEffect } from 'react';
import fetchProjects from '../api/fetchProjects';
import ProjectAdd from './ProjectAdd';

function ProjectSelect({ formData, setFormData }) {
  const [projects, setProjects] = useState([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await fetchProjects();
      setProjects(projectsData);
    };
    fetchData();
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
          value={formData.project || ''}
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
        <ProjectAdd
          newProject={newProject}
          setNewProject={setNewProject}
          handleAddProject={handleAddProject}
          setIsAddingProject={setIsAddingProject}
        />
      )}
    </div>
  );
}

export default ProjectSelect;