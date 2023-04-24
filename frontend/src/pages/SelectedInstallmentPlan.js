import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import firstPayment from './firstPayment'

//components

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
        <div className="selectedInstalmentPlan">
            <center> 
            <h2>Selected Installment Plan</h2>
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
                    <p><strong>No of Months : </strong> {plans.months} </p>

                    {/* calculate the initial payment and display it here */}
                    <p><strong>Initial Payment : </strong> {plans.initialPayment} %</p>
                    <div>
                    <firstPayment plans={plans} gem={gem}></firstPayment>
                    </div>
                    <p><strong>Amount to be paid per month : </strong> </p>
                    <button onClick={() => {navigate(`/payments`)}}> proceed to pay </button>
                </div>
                    
            </div>
            </center>
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