import React, { useState } from 'react';

function AddOrganisationForm({ onAdd, onCancel }) {
  const [newOrganisation, setNewOrganisation] = useState('');

  const handleAdd = () => {
    if (newOrganisation.trim() === '') {
      alert('Organisation name cannot be empty.');
      return;
    }
    onAdd(newOrganisation.trim());
    setNewOrganisation('');
  };

  return (
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
        onClick={handleAdd}
        className="bg-secondary hover:bg-secondary-dark text-white px-4 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Add
      </button>
      <button
        type="button"
        onClick={() => { onCancel(); setNewOrganisation(''); }}
        className="bg-danger hover:bg-danger-dark text-white px-4 py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      >
        Cancel
      </button>
    </div>
  );
}

export default AddOrganisationForm;