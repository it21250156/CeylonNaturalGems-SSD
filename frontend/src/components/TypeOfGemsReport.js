import React from 'react';
import { useGemsContext } from '../hooks/useGemsContext';
import { Pie } from 'react-chartjs-2';

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

  const chartData = {
    labels: gemTypes,
    datasets: [
      {
        data: Object.values(typesCount),
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffcd56'], // Add more colors as needed
      },
    ],
  };

  return (
    <div className="admin-chart-container">
      <h3 className="admin-chart-title">Gem Types Report</h3>
      <div className="pie-chart-container">
        <Pie data={chartData} />
      </div>
      <div className="legend-container">
        {gemTypes.map((type, index) => (
          <div className="legend-item" key={type}>
            <span style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}></span>
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GemTypesReport;
