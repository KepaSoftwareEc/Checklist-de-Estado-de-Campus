import React from 'react';
import { useLocation } from 'react-router-dom';

const Checklist = () => {
  const location = useLocation();
  const { section } = location.state || {};

  const data = {
    electricItems: ['Item 1', 'Item 2', 'Item 3'],
    waterItems: ['Item A', 'Item B', 'Item C'],
    furnitureItems: ['Item X', 'Item Y', 'Item Z'],
    equipmentItems: ['Item 4', 'Item 5', 'Item 6'],
    infrastructureItems: ['Item M', 'Item N', 'Item O'],
    securityItems: ['Item Q', 'Item R', 'Item S'],
  };

  return (
    <div>
      <h1>{section}</h1>
      <ul>
        {data[section]?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;