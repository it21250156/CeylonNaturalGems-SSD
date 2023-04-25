import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { usePlansContext } from "../hooks/usePlanContext"
import { useNavigate } from 'react-router-dom'


const AdminUpdatePlan = () => {
    const { dispatch } = usePlansContext()
    const navigate = useNavigate()

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
            navigate('/AdminInstallmentPlans')
        }
        

    }

    return (
        <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
            <div className="darkBlueTopicBox">
                <h3 className="pageTopic">Update installment plan</h3>
            </div>
                <form className="create-plans" onSubmit={handleSubmit}>
                

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
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value < 100) {
                            setInitialPayment(value);
                        } else {
                            setError("Initial payment must be less than 100");
                        }
                    }}
                    value = {initialPayment}
                    // placeholder={plans.initialPayment}
                />

                <button className="confirm-btn">Save changes</button>

                {error && <div className = "error">{error}</div>}

            </form>
                    
            </div>
        
        </div>

    )
}

export default AdminUpdatePlan