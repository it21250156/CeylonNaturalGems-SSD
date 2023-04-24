import { useEffect  } from "react"
import { usePlansContext } from "../hooks/usePlanContext"
import { useNavigate } from "react-router-dom"

import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';

//components
import PlanForm from "../components/PlanForm"

const AdminInstallmentPlans = () => {

    const { logout } = useLogout();
    const {user} = useAuthContext()
    const handleClick = () => {
      logout();
      navigate('/');
    };
    const navigate = useNavigate()
    const { plans, dispatch} = usePlansContext()

    useEffect(() => {
        const fetchPlans = async () => {
            const response = await fetch('/api/plans')
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_PLANS', payload: json})
            }
        }

        fetchPlans()
    },[dispatch])
    

    return (
        <>
      <header>
      <div>
        <div className="background">
          <div className="headerNameDiv">
            <h1 className="headerName">Ceylon Natural Gems</h1>
          </div>
        </div>

        <nav>
          <div className="navprofileDiv">
              <div className="navEmal">
                <span>
                  Hello Admin
                </span>
                <button onClick={handleClick}>Log out</button>
              </div>
          </div>

          <ul>
            <li>
              <Link to={'/adminHome'}>Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
        <div className="instalmentPlans">
            <center> 
            <button onClick={() => {navigate('/AdminInstallmentPlans/AllInstallments')}}> See All User Installments</button>
            <div className="plans">
                <h3>Installment Plans </h3>
                <hr></hr>
                <PlanForm />
                
                {plans && plans.map((plan) => (
                    <PlanDetailBox key={plan._id} plan={plan} />
                ))}
            </div>
            </center>

            
        </div>
        </>
    )
}


//Detail box 
const PlanDetailBox = ({ plan }) => {
    const { dispatch } = usePlansContext()

    const handleDelete = async() => {
        const response = await fetch('api/plans/' + plan._id , {
            method: 'DELETE',
        })
        const json = await response.json()
    
        if(response.ok) {
            dispatch({type: 'DELETE_PLANS', payload: json})
        }
    }

    const navigate = useNavigate()

    return(
        <div className="plan-detail-box-admin">
            <h4> {plan.name} </h4>
            <p><strong>Months : </strong> {plan.months} </p>
            <p><strong>Initial Payment : </strong> {plan.initialPayment} %</p>
            <span className="btn" onClick = {handleDelete} >  Delete</span>
            <span className="btn" onClick={() => {navigate(`/AdminInstallmentPlans/AdminUpdatePlan/${plan._id}`)}} >Update</span>
        </div>
    )

    
}



export default AdminInstallmentPlans