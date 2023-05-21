import React from 'react';
import { useState, useEffect } from 'react';
import { useGemsContext } from '../hooks/useGemsContext';
import { Bar } from 'react-chartjs-2';

import '../CSS/GemAdminReports.css';

const GemAdminReports = () => {
    const { gems } = useGemsContext();
    const [gemData, setGemData] = useState([]);

    useEffect(() => {
        const calculateAverages = () => {
            let allGemsData = { type: 'All', avgPrice: 0, minPrice: 0, maxPrice: 0 };

            if (gems.length > 0) {
                const prices = gems.map((gem) => gem.price);
                const avgPrice = prices.reduce((acc, curr) => acc + curr, 0) / prices.length;
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                allGemsData = { type: 'All', avgPrice, minPrice, maxPrice };
            }

            const types = [...new Set(gems.map((gem) => gem.type))];
            const data = types.map((type) => {
                const typeGems = gems.filter((gem) => gem.type === type);
                const prices = typeGems.map((gem) => gem.price);
                const avgPrice = prices.reduce((acc, curr) => acc + curr, 0) / prices.length;
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                return { type, avgPrice, minPrice, maxPrice };
            });
            setGemData([allGemsData, ...data]);
        };

        calculateAverages();
    }, [gems]);

    const chartData = {
        labels: gemData.map((gem) => gem.type),
        datasets: [
            {
                label: 'Average Price',
                data: gemData.map((gem) => gem.avgPrice.toFixed(2)),
                backgroundColor: ['#36a2eb', '#ff6384', '#cc65fe', '#ffcd56'], // Add more colors as needed
            },
        ],
    };

    return (
        <div className="reports-gem-admin">

            <div className="gem-admin-bar-chart-container">
                <h3 className="admin-chart-title">Average Price by Gem Type</h3>
                <Bar data={chartData} />
            </div>
        </div>
    );
};

export default GemAdminReports;
