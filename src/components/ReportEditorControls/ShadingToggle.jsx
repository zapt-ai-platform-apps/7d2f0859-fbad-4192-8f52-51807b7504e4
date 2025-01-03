import React from 'react';

function ShadingToggle({ columnShading, handleToggleShading }) {
  return (
    <button
      onClick={handleToggleShading}
      className="px-6 py-3 bg-success text-white rounded-lg hover:bg-success-dark transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
    >
      {columnShading ? 'Disable Column Shading' : 'Enable Column Shading'}
    </button>
  );
}

export default ShadingToggle;