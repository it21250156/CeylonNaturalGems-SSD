import { useState, useEffect } from "react";
import { useGemsContext } from "../hooks/useGemsContext";

import "../CSS/GemAdminHome.css"

const GemAdminReports = () => {
    const { gems } = useGemsContext();
    const [gemData, setGemData] = useState([]);

    useEffect(() => {
        const calculateAverages = () => {
            let allGemsData = { type: "All", avgPrice: 0, minPrice: 0, maxPrice: 0 };

            if (gems.length > 0) {
                const prices = gems.map((gem) => gem.price);
                const avgPrice = prices.reduce((acc, curr) => acc + curr, 0) / prices.length;
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                allGemsData = { type: "All", avgPrice, minPrice, maxPrice };
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

    return (
        <div className="reports gem-admin-reports">
            <h2 className="report-title">Pricing Report</h2>
            <table className="report-table">
                <thead>
                    <tr>
                        <th className="gem-admin-report-header">Type</th>
                        <th className="gem-admin-report-header">Average Price</th>
                        <th className="gem-admin-report-header">Lowest Price</th>
                        <th className="gem-admin-report-header">Highest Price</th>
                    </tr>
                </thead>
                <tbody>
                    {gemData.map((gem) => (
                        <tr key={gem.type} className="report-row">
                            <td className="gem-admin-report-cell">{gem.type}</td>
                            <td className="gem-admin-report-cell">Rs. {gem.avgPrice.toFixed(2)}/=</td>
                            <td className="gem-admin-report-cell">Rs. {gem.minPrice}/=</td>
                            <td className="gem-admin-report-cell">Rs. {gem.maxPrice}/=</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GemAdminReports;
