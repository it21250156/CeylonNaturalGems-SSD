import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../CSS/InstPlans.css';
import '../CSS/GemCard.css';
import '../CSS/BodyTemp.css';




import FirstPayment from '../components/firstPayment'
import MonthlyPayment from '../components/monthlyPayment';

const SelectedInstallmentPlan = () => {
    const navigate=useNavigate()

    const [plans , setPlans] = useState({name: "", months: "", initialPayment: ""}) //put 0 for a number
    
    const gem = JSON.parse(localStorage.getItem('gemInfo'));

    const {id} = useParams();

    useEffect(() => {
        const fetchPlans = async () => {
            const response = await fetch(`/api/plans/${id}`)
            const json = await response.json()

            if(response.ok){
                setPlans(json)
            }
        }

        fetchPlans()
    },[])

    return (
        <>
    <Header/>
        <div className="gemhome">
        <div className="gems">
            <div className="lightBlueBodyBG">
            <div className="whiteBodyBG">
                <div className="darkBlueTopicBox">
                <h3 className="pageTopic">{plans.name} Plan</h3>
                </div>
                <div className="gem-cards">
                    <div className="img-section-installment-vihii" >
                        <span className="img-section-installment"></span>
                        <div className="plans">
                            <hr></hr>
                                <div>
                                    <h3> --Gem Details-- </h3>
                                    <h4> name: {gem.name} </h4>
                                    <h4> price: {gem.price} </h4>
                                </div>
                        <hr></hr>
                            <div className="slected-plan-details">
                                <h4> {plans.name} </h4>
                                <p><strong>Initial Payment : </strong> {plans.initialPayment} %</p>
                                <div>
                                <FirstPayment plans={plans} gem={gem}> </FirstPayment>
                            </div>
                            <p><strong>No of Months : </strong> {plans.months} </p>
                            <div>
                                <MonthlyPayment plans={plans} gem={gem}></MonthlyPayment>
                            </div>
                            </div>
                            <button className="card-button-vihii" onClick={() => {navigate(`/payments`)}}> proceed to pay </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}

// const firstPayment = ({ plans , gem }) => {
//     let fpay=0;

//     let price = gem.price;
//     let initial = plans.initialPayment;

//     fpay = (price * initial) / 100;

//     console.log(fpay)

//     return fpay;

// }

export default SelectedInstallmentPlan