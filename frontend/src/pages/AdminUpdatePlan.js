import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { usePlansContext } from "../hooks/usePlanContext"


const AdminUpdatePlan = () => {
    const { dispatch } = usePlansContext()

    const [name, setName] = useState('')
    const [months, setMonths] = useState('')
    const [initialPayment, setInitialPayment] = useState('')
    const [error, setError] = useState(null)

    const [plans , setPlans] = useState({}) //put 0 for a number

    const {id} = useParams();

    useEffect(() => {
        const fetchPlans = async () => {
            const response = await fetch(`/api/plans/${id}`)
            const json = await response.json()

            if(response.ok){
                setPlans(json)
                setName(json.name)
                setMonths(json.months)
                setInitialPayment(json.initialPayment)
                setError(null)
            }
        }

        fetchPlans()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/plans/${id}` , {
            method: 'PATCH',
            body: JSON.stringify({
                name:name,
                months:months,
                initialPayment:initialPayment,
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            
        })

        const json = await response.json()
        
        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){
            setName(json.name)
            setMonths(json.months)
            setInitialPayment(json.initialPayment)
            setError(null)
            // dispatch({type: 'UPDATE_PLANS' , payload: json})

            console.log('Plan Updated' , json ) 
        }
        

    }

    return (
        <div className="selectedInstalmentPlan">
            <center> 
            <h2>Admin</h2>
            <div className="plans">
                <form className="create-plans" onSubmit={handleSubmit}>
                <h3> Update installment plan </h3>

                <lable>Plan name:</lable>
                <input 
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value = {name}
                    // placeholder={plans.name}
                />

                <lable>Number of months:</lable>
                <input 
                    type="number"
                    onChange={(e) => setMonths(e.target.value)}
                    value = {months}
                    // placeholder={plans.months}
                />

                <lable>Initial payment (as a percentage):</lable>
                <input 
                    type="number"
                    onChange={(e) => setInitialPayment(e.target.value)}
                    value = {initialPayment}
                    // placeholder={plans.initialPayment}
                />

                <button className="btn">Save changes</button>

                {error && <div className = "error">{error}</div>}

            </form>
                    
            </div>
            </center>
        </div>
    )
}

export default AdminUpdatePlan