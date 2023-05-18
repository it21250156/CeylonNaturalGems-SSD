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
        <div className="admin-bar-chart-container">
            <div className="admin-chart">
                {gemTypes.map((type, index) => (
                    <div
                        className="admin-bar"
                        key={type}
                        style={{ height: `${(typesCount[type] / maxCount) * 100}%` }}
                    />
                ))}
            </div>
            <div className="admin-axis-labels">
                <div className="admin-y-axis">

                </div>
                <div className="admin-x-axis">
                    {gemTypes.map((type, index) => (
                        <div className="admin-x-axis-label" key={type}>
                            {type}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default GemTypesReport;
