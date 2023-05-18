import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom'
//import '../CSS/InstPlans.css'
import '../CSS/Gemhome.css';
import '../CSS/GemCard.css';
import Header from '../components/Header';

//components


const InstallmentPlans = () => {

    const [plans , setPlans] = useState(null)

    useEffect(() => {
        const fetchPlans = async () => {
            const response = await fetch('/api/plans')
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
              <h3 className="pageTopic">Installment Plans</h3>
            </div>
            <h6>Please select your desired installment plan </h6>
                <hr></hr>
            <div className="gem-cards">
            {plans && plans.map((plan) => (
                        <PlanDetailBox key={plan._id} plan={plan} />
                    ))}
            </div>
          </div>
        </div>
      </div>
    </div>
        {/* <div className="gemhome">

            <div className="darkBlueTopicBox">
                <h3 className="pageTopic">InstallmentPlans</h3>
            </div>

            <div className="lightBlueBodyBG">
                <h3>Please select your desired installment plan </h3>
                <hr></hr>
                <div>
                    {plans && plans.map((plan) => (
                        <PlanDetailBox key={plan._id} plan={plan} />
                    ))}
                </div>

            </div>
            
        </div> */}
        </>
    )
}


//Detail box function
const PlanDetailBox = ({ plan }) => {
    const navigate = useNavigate()

    return(
        <div className="card">
            <div className="card-content">
                <h1 className="card-name-installment"><strong>{plan.name}</strong></h1>
                <h4>Months : {plan.months} </h4>
                <h4>Initial Payment :  {plan.initialPayment} %</h4>
            </div>
            <button className="card-button" onClick={() => {navigate(`/InstallmentPlans/selectedInstallmentPlan/${plan._id}`)}}> Select </button>
        </div>
    )
}

export default InstallmentPlans