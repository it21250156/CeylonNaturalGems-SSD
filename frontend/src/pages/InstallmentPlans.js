import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom'


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
        <div className="instalmentPlans">
            <center> 
            <h2>Installment Plans</h2>
            <div className="plans">
                <h3>Please select your desired installment plan </h3>
                <hr></hr>
                {plans && plans.map((plan) => (
                    <PlanDetailBox key={plan._id} plan={plan} />
                ))}
            </div>
            </center>
        </div>
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