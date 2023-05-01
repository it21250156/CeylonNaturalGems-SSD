import { useState, useEffect } from "react";
import { useGemsContext } from "../hooks/useGemsContext";

const GemAdminReports = () => {
    const { gems } = useGemsContext();
    const [gemData, setGemData] = useState([]);

    useEffect(() => {
        const calculateAverages = () => {
            const prices = gems.map((gem) => gem.price);
            const avgPrice = prices.reduce((acc, curr) => acc + curr, 0) / prices.length;
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            setGemData([{ type: "All", avgPrice, minPrice, maxPrice }]);
        };

        calculateAverages();
    }, [gems]);

    return (
        <div className="reports">
            <h2>Pricing Report</h2>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Average Price</th>
                        <th>Lowest Price</th>
                        <th>Highest Price</th>
                    </tr>
                </thead>
                <tbody>
                    {gemData.map((gem) => (
                        <tr key={gem.type}>
                            <td>{gem.type}</td>
                            <td>Rs. {gem.avgPrice.toFixed(2)}/=</td>
                            <td>Rs. {gem.minPrice}/=</td>
                            <td>Rs. {gem.maxPrice}/=</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GemAdminReports;
