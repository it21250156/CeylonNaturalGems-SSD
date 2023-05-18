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
            {/* <button className="confirm-btn" onClick={() => {navigate('/AdminInstallmentPlans/AllInstallments')}}> See All User Installments</button> */}
            <div className="lightBlueBodyBG">
            <button className="adminHome-bigBtns" 
            style={{marginLeft : "60%"}}
            onClick={() => {navigate('/AdminInstallmentPlans/InstallmentReport')}}> Reports </button>

            <button className="adminHome-bigBtns" 
            style={{marginLeft : "60%"}}
            onClick={() => {navigate('/AdminInstallmentPlans/AllInstallments')}}> See All User Installments</button>


            <div className="whiteBodyBG">
              <div className="darkBlueTopicBox">
                  <h3 className="pageTopic">Installment Plans</h3>
              </div>
              <br></br>
              <div style={{height : "100%"}}>
                <div className="lightBlueBodyBG" style={{width : "45%" , marginLeft: "50%" , height : "100%" , boxShadow : "10px 10px 20px rgba(0, 0, 0, 0.2)"}}>
                    <div>
                    <PlanForm />
                    </div>
                </div>   
                <div className="shadow p-3 mb-5 bg-body-tertiary rounded" style={{ width : "40%" , marginLeft: "2%" , marginTop : "-500px"}}>
                  {plans && plans.map((plan) => (
                        <PlanDetailBox key={plan._id} plan={plan} />
                    ))}
                </div>
              </div>
              
                
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
            <span className="btn btn-danger"
             //onClick = {handleDelete} 
             style={{marginRight : "10px"}}
             onClick={() => setShowModal(true)}
             > 
              Delete</span> 
            <span className="btn btn-warning" 
             style={{backgroundColor : "#2c74b3" , border : "#2c74b3" , color : "white"}}
            onClick={() => {navigate(`/AdminInstallmentPlans/AdminUpdatePlan/${plan._id}`)}} >Update</span>
        
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