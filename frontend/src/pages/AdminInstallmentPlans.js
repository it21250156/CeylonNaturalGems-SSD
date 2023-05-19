import { useEffect, useState } from "react";
import { usePlansContext } from "../hooks/usePlanContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import React from "react";
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../CSS/planForm.css'

// components
import PlanForm from "../components/PlanForm";

const AdminInstallmentPlans = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
    navigate('/');
  };
  const navigate = useNavigate();
  const { plans, dispatch } = usePlansContext();

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await fetch('/api/plans');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_PLANS', payload: json });
      }
    };

    fetchPlans();
  }, [dispatch]);

  const handleDeletePlan = async (plan) => {
    const confirmation = await Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this Plan?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await axios.delete(`/api/plans/${plan._id}`);
        const deletedPlan = response.data;

        dispatch({ type: 'DELETE_PLAN', payload: deletedPlan });
        Swal.fire('Deleted!', 'The plan has been deleted.', 'success').then(() => {
          window.location.reload();
        });
      } catch (error) {
        Swal.fire('Error', 'Failed to delete the plan.', 'error');
      }
    }
  };

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
        <div className="lightBlueBodyBG">
          <button className="adminHome-bigBtns"
            style={{ marginLeft: "60%" }}
            onClick={() => { navigate('/AdminInstallmentPlans/InstallmentReport') }}> Reports </button>

          <button className="adminHome-bigBtns"
            style={{ marginLeft: "60%" }}
            onClick={() => { navigate('/AdminInstallmentPlans/AllInstallments') }}> See All User Installments</button>

          <div className="whiteBodyBG">
            <div className="darkBlueTopicBox">
              <h3 className="pageTopic">Installment Plans</h3>
            </div>
            <br></br>
            <div style={{ height: "100%" }}>
              <div className="lightBlueBodyBG" style={{ width: "45%", marginLeft: "50%", height: "100%", boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)" }}>
                <div>
                  <PlanForm />
                </div>
              </div>
              <div className="shadow p-3 mb-5 bg-body-tertiary rounded" style={{ width: "40%", marginLeft: "2%", marginTop: "-500px" }}>
                {plans && plans.map((plan) => (
                  <PlanDetailBox key={plan._id} plan={plan} onDelete={() => handleDeletePlan(plan)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Detail box 
const PlanDetailBox = ({ plan, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="lightBlueBodyBG">
      <h4> {plan.name} </h4>
      <p><strong>Months: </strong> {plan.months} </p>
      <p><strong>Initial Payment: </strong> {plan.initialPayment} %</p>
      <span className="btn btn-danger"
        style={{ marginRight: "10px" }}
        onClick={() => onDelete()}
      >
        Delete
      </span>
      <span className="btn btn-warning"
        style={{ backgroundColor: "#2c74b3", border: "#2c74b3", color: "white" }}
        onClick={() => { navigate(`/AdminInstallmentPlans/AdminUpdatePlan/${plan._id}`) }}
      >
        Update
      </span>
    </div>
  );
};

export default AdminInstallmentPlans;
