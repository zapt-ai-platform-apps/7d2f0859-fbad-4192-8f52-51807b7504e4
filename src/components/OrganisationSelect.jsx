import React, { useState, useEffect } from 'react';

function OrganisationSelect({ formData, setFormData }) {
  const [organisations, setOrganisations] = useState([]);
  const [isAddingOrganisation, setIsAddingOrganisation] = useState(false);
  const [newOrganisation, setNewOrganisation] = useState('');

  useEffect(() => {
    // Fetch existing organisations
    fetch('/api/getOrganisations')
      .then(response => response.json())
      .then(data => setOrganisations(data))
      .catch(error => console.error('Error fetching organisations:', error));
  }, []);

  const handleOrganisationChange = (e) => {
    const value = e.target.value;
    if (value === 'add_new') {
      setIsAddingOrganisation(true);
      setFormData({ ...formData, organisation: '' });
    } else {
      setFormData({ ...formData, organisation: value });
    }
  };

  const handleAddOrganisation = () => {
    if (newOrganisation.trim() === '') {
      alert('Organisation name cannot be empty.');
      return;
    }
    setFormData({ ...formData, organisation: newOrganisation.trim() });
    setOrganisations([...organisations, newOrganisation.trim()]);
    setNewOrganisation('');
    setIsAddingOrganisation(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-muted mb-1" htmlFor="organisation">
        Organisation
      </label>
      {!isAddingOrganisation ? (
        <select
          id="organisation"
          value={formData.organisation}
          onChange={handleOrganisationChange}
          className="w-full p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border cursor-pointer"
        >
          <option value="">Select Organisation</option>
          {organisations.map((organisation, index) => (
            <option key={index} value={organisation}>
              {organisation}
            </option>
          ))}
          <option value="add_new">+ Add New Organisation</option>
        </select>
      ) : (
        <div className="flex space-x-2">
          <input
            type="text"
            value={newOrganisation}
            onChange={(e) => setNewOrganisation(e.target.value)}
            placeholder="Enter new organisation"
            className="flex-1 p-3 border border-muted rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent box-border"
          />
          <button
            type="button"
            onClick={handleAddOrganisation}
            className="bg-secondary hover:bg-secondary-dark text-white px-4 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => { setIsAddingOrganisation(false); setNewOrganisation(''); }}
            className="bg-danger hover:bg-danger-dark text-white px-4 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default OrganisationSelect;