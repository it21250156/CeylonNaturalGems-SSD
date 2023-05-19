import React from 'react';
import { useGemsContext } from '../hooks/useGemsContext';

import '../CSS/GemAdminReports.css';

const GemTypesReport = () => {
  const { gems } = useGemsContext();

  const typesCount = gems.reduce((acc, gem) => {
    if (!acc[gem.type]) {
      acc[gem.type] = 1;
    } else {
      acc[gem.type]++;
    }
    return acc;
  }, {});

  const gemTypes = Object.keys(typesCount);

  return (
    <div className="admin-table-container">
      <table className="report-table">
        <thead>
          <tr>
            <th className="gem-admin-report-header">Type</th>
            <th className="gem-admin-report-header">Count</th>
          </tr>
        </thead>
        <tbody>
          {gemTypes.map((type, index) => (
            <tr key={type} className="report-row">
              <td className="gem-admin-report-cell">{type}</td>
              <td className="gem-admin-report-cell">{typesCount[type]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GemTypesReport;
