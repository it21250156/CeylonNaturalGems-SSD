import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

import '../CSS/AdminHome.css';

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
      <body>
        <div className="home">
          <div className="admin-home-page-topic-box">
            <h1 className="adminWelcome">Welcome Admin</h1>
          </div>

          <div className="adminBtnsBody">
            <div className="adminHome-col1">
              <button
                className="adminHome-bigBtns"
                onClick={() => {
                  navigate('/GemAdminHome');
                }}
              >
                Gem Stones
              </button>
              <button
                className="adminHome-bigBtns"
                onClick={() => {
                  navigate('/JewelleryAdminDashboard');
                }}
              >
                Jewellery
              </button>
              <button
                className="adminHome-bigBtns"
                onClick={() => {
                  navigate('/reqAd');
                }}
              >
                Gem Requests
              </button>
              <button
                className="adminHome-bigBtns"
                onClick={() => {
                  navigate('/AdminFeedbacks');
                }}
              >
                Feedbacks
              </button>
            </div>

            <div className="adminHome-col2">
              <button
                className="adminHome-bigBtns"
                onClick={() => {
                  navigate('/AdminInstallmentPlans');
                }}
              >
                Installments
              </button>

              <button
                className="adminHome-bigBtns"
                onClick={() => {
                  navigate('/AdminPayments');
                }}
              >
                Payments
              </button>

              <button
                className="adminHome-bigBtns"
                onClick={() => {
                  navigate('/AdminDelivery');
                }}
              >
                Deliveries
              </button>

              <button
                className="adminHome-bigBtns"
                onClick={() => {
                  navigate('/AllUsers');
                }}
              >
                Customer Details
              </button>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default AdminHome;
