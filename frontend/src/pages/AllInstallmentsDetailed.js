import { useEffect, useState } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

import "../CSS/Vih's.css";

const AllInstallmentsDetailed = () => {
  const { id } = useParams();

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  const [installment, setInstallment] = useState({
    user: '',
    gemID: '',
    planID: '',
    noOfMonths: '',
    totalAmount: '',
    initialPayment: '',
    monthlyPayment: '',
    installmentDates: [],
    status: '',
  });

  const [gems, setGems] = useState([]);
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchInstallments = async () => {
      const response = await fetch(`/api/installments/${id}`);
      const json = await response.json();

      if (response.ok) {
        setInstallment(json);
      }
    };

    fetchInstallments();
  }, []);

  useEffect(() => {
    const fetchGems = async () => {
      try {
        const response = await fetch('/api/gems&jewelleries/gems');
        const json = await response.json();
        setGems(json);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const json = await response.json();
        setUsers(json);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans');
        const json = await response.json();
        setPlans(json);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlans();
    fetchGems();
    fetchUsers();
  }, []);

  const usersName = users.find((user) => user._id === installment.user);

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

      <div className="darkBlueTopicBox">
        <h3 className="pageTopic">Installement Details</h3>
      </div>

      <div className="lightBlueBodyBG">
        <div className="top-box-inst">
          <div className="top-left-box">
            <h3 className="gem-name-inst">
              {gems.find((gem) => gem._id === installment.gemID)?.name}{' '}
            </h3>
            <h3 className="cus-name-inst">
              {' '}
              Customer: {usersName?.firstName} {usersName?.lastName}{' '}
            </h3>
          </div>

          <div className="top-right-box">
            <table className="table table-striped inst-table-1">
              <tr>
                <td className="top-table-labels ">Purchased Date</td>
                <td>
                  {new Date(
                    installment.installmentDates[0]
                  ).toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <td className="top-table-labels">Installement Plan</td>{' '}
                <td>
                  {plans.find((plan) => plan._id === installment.planID)?.name}
                </td>
              </tr>
              <tr>
                <td className="top-table-labels">Total Amount</td>{' '}
                <td>{installment.totalAmount}</td>
              </tr>
              <tr>
                <td className="top-table-labels">Initial Payment</td>{' '}
                <td>{installment.initialPayment}</td>
              </tr>
              <tr>
                <td className="top-table-labels">Monthly Payment</td>{' '}
                <td>{installment.monthlyPayment}</td>
              </tr>
              <tr>
                <td className="top-table-labels">
                  Total Number of Months to Pay
                </td>{' '}
                <td>{installment.noOfMonths}</td>
              </tr>

              <br></br>
              <tr>
                <td className="top-table-labels">Status</td>{' '}
                <td>{installment.status}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="white-box-inst">
          <h3>Payment Details</h3>
          <hr></hr>

          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Date of the Payemnt</th>
                <th>Time of the Payemnt</th>
                <th>Payment Status</th>
              </tr>
            </thead>

            <tbody>
              {installment.installmentDates.map((date, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{new Date(date).toLocaleDateString()}</td>
                  <td>{new Date(date).toLocaleTimeString()}</td>
                  <td>Completed</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllInstallmentsDetailed;
