import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';

// components

const AdminHome = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
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
                <span>Hello Admin</span>
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
      <body>
        <div className="home">
          <h1>hi Admin</h1>
          <button
            onClick={() => {
              navigate('/GemAdminHome');
            }}
          >
            Gem Stones
          </button>
          <button
            onClick={() => {
              navigate('/JewelleryAdminDashboard');
            }}
          >
            Jewellery
          </button>
          <button
            onClick={() => {
              navigate('/reqAd');
            }}
          >
            Gem Requests
          </button>
          <button
            onClick={() => {
              navigate('/AdminFeedbacks');
            }}
          >
            Feedbacks
          </button>
          <button
            onClick={() => {
              navigate('/AdminInstallmentPlans');
            }}
          >
            Installments
          </button>

          <button
            onClick={() => {
              navigate('/AdminPayments');
            }}
          >
            Payments
          </button>

          <button
            onClick={() => {
              navigate('/AdminDelivery');
            }}
          >
            Deliveries
          </button>

          <button
            onClick={() => {
              navigate('/AllUsers');
            }}
          >
            Customer Details
          </button>
        </div>
      </body>
    </>
  );
};

export default AdminHome;
