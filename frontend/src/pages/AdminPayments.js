import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/table.css';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import axios from 'axios';

const { useState } = require('react');

const AdminPayments = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  const [payments, setPayments] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('/api/payments');
        const json = await response.json();

        if (response.ok) {
          const filteredPayments = json.filter((payment) => {
            const amount = payment.amount || '';
            const pmethod = payment.pmethod || '';

            return (
              (payment._id &&
                payment._id
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())) ||
              (typeof amount === 'string' &&
                amount.toLowerCase().includes(searchQuery.toLowerCase())) ||
              (typeof pmethod === 'string' &&
                pmethod.toLowerCase().includes(searchQuery.toLowerCase()))
            );
          });
          setPayments(filteredPayments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPayments();
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    //payment ID
    //date
    //payment amount
    //payment method
    //order ID
    //user ID

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

      <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
          <div className="darkBlueTopicBox">
            <h3 className="pageTopic"> PAYMENT DETAILS </h3>
          </div>

          <div className="adminDel">
            {/*   
<input
              type="text"
              placeholder="Search Payment ID / Amount / Payment Method "
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            /> */}

            <input
              className="gem-search-input"
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search Payments"
            />

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  {/* <th>Order ID </th> */}
                  <th>User ID </th>
                  <th>Date</th>
                  <th>Payment Amount </th>
                  <th>Payment Method</th>
                </tr>
              </thead>

              <tbody>
                {payments &&
                  payments.map((payment) => (
                    <PPaymentRow key={payment._id} payment={payment} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const PPaymentRow = ({ payment }) => {
  //  const [status, setStatus] = useState(payment.dStatus);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [carts, setCart] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const json = await response.json();
        setUsers(json);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  //   useEffect(() => {
  //     const fetchCart = async () => {
  //       try {
  //         const response = await fetch('/api/carts');
  //         const json = await response.json();
  //         setCart(json);
  //       } catch (err) {

  //       }
  //     };
  //     fetchCart();
  // }, []);

  const handleStatusChange = async (payment_id, e) => {
    e.preventDefault();

    //  const payment = {status}

    const response = await fetch('/api/payments', {
      method: 'PATCH',
      body: JSON.stringify(payment),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    // if(!response.ok){
    //   setError(json.error)
    // }
    // if(response.ok){
    //     setStatus('')
    //     setError(null)
    //     console.log('delivery status updated!' , json)
    // }
  };

  return (
    <tr key={payment._id}>
      <td>{payment._id}</td>
      {/* <td>{carts.find((cart) => cart._id === payment.cart)?._id} {}</td> */}
      <td>
        {users.find((user) => user._id === payment.user)?._id} {}
      </td>
      <td>
        {payment.createdAt && (
          <>
            <div>Date: {new Date(payment.createdAt).toLocaleDateString()}</div>
            <div>Time: {new Date(payment.createdAt).toLocaleTimeString()}</div>
          </>
        )}
      </td>
      <td>{payment.amount}</td>
      <td>{payment.pmethod}</td>
    </tr>
  );
};

export default AdminPayments;
