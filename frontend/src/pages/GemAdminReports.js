import GemAdminPriceReport from "../components/GemAdminPriceReport";
import TypeOfGemReport from "../components/TypeOfGemsReport";
import Header from '../components/Header';


const GemAdminReportsPage = () => {
    return (
        <><Header />
            <div>
                <h1>Gem Admin Reports Page</h1>
                <div>
                    <h2 className="report-title">Gem Price Report</h2>
                    <GemAdminPriceReport />
                    <h2 className="report-title">Gem Type Report</h2>
                    <TypeOfGemReport />
                </div>
            </div>
        </>
    );
};

export default GemAdminReportsPage;

