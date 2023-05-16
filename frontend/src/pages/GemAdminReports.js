import GemAdminPriceReport from "../components/GemAdminPriceReport";
import TypeOfGemReport from "../components/TypeOfGemsReport";
import Header from '../components/Header';


const GemAdminReportsPage = () => {
    return (
        <><Header />
            <div>
                <h1>Gem Admin Reports Page</h1>
                <div>
                    <GemAdminPriceReport />
                    <TypeOfGemReport />
                </div>
            </div>
        </>
    );
};

export default GemAdminReportsPage;

