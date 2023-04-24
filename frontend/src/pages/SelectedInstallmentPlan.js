import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

//components

const SelectedInstallmentPlan = () => {
    const [plans , setPlans] = useState({name: "", months: "", initialPayment: ""}) //put 0 for a number
    const [gem , setGem] = useState({name: "", price: ""})

    const {id} = useParams();
    const {gemid} = useParams();

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

    useEffect(() => {
        const fetchGems = async () => {
            const response = await fetch(`/api/gems&jewelleries/gems/${gemid}`)
            const json = await response.json()

            if(response.ok){
                setGem(json)
            }
        }

        fetchGems()
    },[])

    return (
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
                    <p><strong>Months : </strong> {plans.months} </p>

                    {/* calculate the initial payment and display it here */}
                    <p><strong>Initial Payment : </strong> {plans.initialPayment} %</p>
                    <p><strong>Amount to be paid per month : </strong> </p>
                    <button> proceed to pay </button>
                </div>
                    
            </div>
            </center>
        </div>
    )
}

export default SelectedInstallmentPlan