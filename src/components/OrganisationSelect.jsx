import React, { useState } from 'react';
import useOrganisations from '../hooks/useOrganisations';
import AddOrganisationForm from './AddOrganisationForm';

function OrganisationSelect({ formData, setFormData }) {
  const [organisations, setOrganisations] = useOrganisations();
  const [isAddingOrganisation, setIsAddingOrganisation] = useState(false);

  const handleOrganisationChange = (e) => {
    const value = e.target.value;
    if (value === 'add_new') {
      setIsAddingOrganisation(true);
      setFormData({ ...formData, organisation: '' });
    } else {
      setFormData({ ...formData, organisation: value });
    }
  };

  const handleAddOrganisation = (newOrganisation) => {
    setFormData({ ...formData, organisation: newOrganisation });
    setOrganisations([...organisations, newOrganisation]);
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
        <AddOrganisationForm
          onAdd={handleAddOrganisation}
          onCancel={() => setIsAddingOrganisation(false)}
        />
      )}
    </div>
  );
}

export default OrganisationSelect;