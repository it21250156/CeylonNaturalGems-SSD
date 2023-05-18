import { useState } from "react"
import { usePlansContext } from "../hooks/usePlanContext"
import { useNavigate, useLocation } from 'react-router-dom'; //reload the page

const PlanForm = () => {
    const { dispatch } = usePlansContext()

    const navigate = useNavigate()  //reload the page
    const location = useLocation(); //reload the page

    const [name, setName] = useState('')
    const [months, setMonths] = useState('')
    const [initialPayment, setInitialPayment] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const plan = { name, months, initialPayment}

        const response = await fetch('/api/plans', {
            method: 'POST',
            body: JSON.stringify(plan),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){
            setName('')
            setMonths('')
            setInitialPayment('')
            setError(null)
            dispatch({type: 'CREATE_PLANS' , payload: json})

            console.log('new plan added' , json )
        }

        navigate(location.state?.from || '/' && window.location.reload());  //reload the page

    }

    return(
        <form className="create-plans" onSubmit={handleSubmit}>
            <h3> Add a new installment plan </h3>

            <lable>Plan name:</lable>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value = {name}
            />

            <lable>Number of months:</lable>
            <input 
                type="number"
                onChange={(e) => setMonths(e.target.value)}
                value = {months}
            />

            <lable>Initial payment (as a percentage):</lable>
            {/* <input 
                type="number"
                onChange={(e) => setInitialPayment(e.target.value)}
                value = {initialPayment}
            /> */}

            <input
                type="number"
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value < 100) {
                        setInitialPayment(value);
                    } else {
                        setError("Initial payment must be a percentage value ( Less than 100 )");
                    }
                }}
                value={initialPayment}
            />
            {error && <div className = "error">{error}</div>}


            <button className="confirm-btn" >Add Installment Plan </button>

            {/* {error && <div className = "error">{error}</div>} */}

        </form>
    )

}


export default PlanForm