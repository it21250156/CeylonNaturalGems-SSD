import { useState, useEffect } from "react";
import { useGemsContext } from "../hooks/useGemsContext";

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
