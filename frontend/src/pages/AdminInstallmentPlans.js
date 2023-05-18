import { useEffect , useState } from "react"
import { usePlansContext } from "../hooks/usePlanContext"
import { useNavigate } from "react-router-dom"

import { useAuthContext } from "../hooks/useAuthContext"
import React from "react";

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';
import '../CSS/planForm.css'

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
                <span className="welcomeNoteAdmin">Hello Admin</span>
                <button className="adminLogoutBtn" onClick={handleClick}>
                  Log out
                </button>
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
            <br></br>
            <button className="confirm-btn" onClick={() => {navigate('/AdminInstallmentPlans/AllInstallments')}}> See All User Installments</button>
            <div className="lightBlueBodyBG">
            <div className="whiteBodyBG">
            <div className="darkBlueTopicBox">
                <h3 className="pageTopic">Installment Plans</h3>
            </div>
            <div className="lightBlueBodyBG">
                <PlanForm />
             </div>   
                {plans && plans.map((plan) => (
                    <PlanDetailBox key={plan._id} plan={plan} />
                ))}
            </div>
            </div>

            
        </div>
        </>
    )
}


//Detail box 
const PlanDetailBox = ({ plan }) => {
    const { dispatch } = usePlansContext()
    const [showModal, setShowModal] = useState(false);

    const handleConfirm = () => {
      setShowModal(false);
      handleDelete();
    };
  
    const handleCancel = () => {
      setShowModal(false);
    };

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
        <div className="lightBlueBodyBG">
            <h4> {plan.name} </h4>
            <p><strong>Months : </strong> {plan.months} </p>
            <p><strong>Initial Payment : </strong> {plan.initialPayment} %</p>
            <span className="confirm-btn"
             //onClick = {handleDelete} 
             onClick={() => setShowModal(true)}
             > 
              Delete</span> 
            <span className="confirm-btn" onClick={() => {navigate(`/AdminInstallmentPlans/AdminUpdatePlan/${plan._id}`)}} >Update</span>
        
            {showModal && (
          <div className="modal-container">
            <div className="modal-content">
              <h2 className="modal-title">Confirm Deletion</h2>
              <p className="modal-message">Are you sure ? <br></br> you want to delete this Plan ?</p>
              <div className="modal-actions">
                <button className="modal-button confirm" onClick={handleConfirm}>
                  Confirm
                </button>
                <button className="modal-button cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        </div>
    )

    
}



export default AdminInstallmentPlans