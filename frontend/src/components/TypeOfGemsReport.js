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

    const maxCount = Math.max(...Object.values(typesCount));

    const gemTypes = Object.keys(typesCount);

    return (
        <div className="bar-chart-container">
            <div className="chart">
                {gemTypes.map((type, index) => (
                    <div
                        className="bar"
                        key={type}
                        style={{ height: `${(typesCount[type] / maxCount) * 100}%` }}
                    />
                ))}
            </div>
            <div className="axis-labels">
                <div className="y-axis">

                </div>
                <div className="x-axis">
                    {gemTypes.map((type, index) => (
                        <div className="x-axis-label" key={type}>
                            {type}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default GemTypesReport;
