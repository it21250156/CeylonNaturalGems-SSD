import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom'
import '../CSS/InstPlans.css'
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
        <div className="instalmentPlans">

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
            
        </div>
        </>
    )
}


//Detail box function
const PlanDetailBox = ({ plan }) => {
    const navigate = useNavigate()

    return(
        <div className="plan-detail-box">
            <h4> {plan.name} </h4>
            <p><strong>Months : </strong> {plan.months} </p>
            <p><strong>Initial Payment : </strong> {plan.initialPayment} %</p>
            <button onClick={() => {navigate(`/InstallmentPlans/selectedInstallmentPlan/${plan._id}`)}}> Select </button>
        </div>
    )
}

export default InstallmentPlans