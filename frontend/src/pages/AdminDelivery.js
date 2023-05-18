import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/AdminDelivery.css';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';


const { useState } = require('react');

const AdminDelivery = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  const [payments, setPayments] = useState(null);
  const [reload, setReload]     = useState(true);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchPayments = async () => {
      const response = await fetch('/api/payments');
      const json = await response.json();

      if (response.ok) {
          // setPayments(json);
          const filteredPayments = json.filter(payment =>
            payment.country && payment.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.district && payment.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.dmethod && payment.dmethod.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setPayments(filteredPayments);
      }
      setReload(false);
    };

    fetchPayments();
  }, [reload , searchQuery]);

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
      <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
          <div className="title-box-delivery">
            <h3 className="title-delivery"> DELIVERY DETAILS </h3>
          </div>

          <div className = "adminDel">
          <input
              type="text"
              placeholder="Search Country , District , Delivery Method "
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />

            <table className="delDetailsTable">
              <thead className="delTableHead">
                <tr>
                  <th className="delTableHead-box">Payment ID</th>
                  <th className="delTableHead-box">Date</th>
                  <th className="delTableHead-box">Address</th>
                  <th className="delTableHead-box">District</th>
                  <th className="delTableHead-box">Country</th>
                  <th className="delTableHead-box">Delivery Method</th>
                  <th className="delTableHead-box">Delivery Status</th>
                </tr>
              </thead>

              <tbody>
                {payments &&
                  payments.map((payment) => (
                    <PDeliveryRow
                      key={payment._id}
                      payment={payment}
                      reload={reload}
                      setReload={setReload}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

const PDeliveryRow = ({ payment, setReload }) => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);

  const handleStatusChange = async (e) => {
    // e.preventDefault()
    setStatus(e.target.value);

    // const payment = {status}

    // const response = await fetch('/api/payments' , {
    //     method:'POST' ,
    //     body: JSON.stringify(payment),
    //     headers: {
    //         'Content-Type' : 'application/json'
    //     }
    // })

    // const json = await response.json()

    // if(!response.ok){
    //   setError(json.error)
    // }
    // if(response.ok){
    //     setStatus('')
    //     setError(null)
    //     console.log('delivery status updated!' , json)
    // }
    const updatedPayment = {
      ...payment,
      dStatus: e.target.value,
    };
    console.log(updatedPayment);

    try {
      const response = await fetch(`/api/payments/${payment._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPayment),
      });
      console.log(response);
      if (response.ok) {
        setStatus('');
        setError(null);
        console.log('Delivery status updated!', response.data);
        setReload(true);
      } else {
        setError('Error updating delivery status.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this Payment ?'
    );
    if (confirmDelete) {
      try {
        setIsDeleting(true);
        const response = await fetch(`api/payments/${payment._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          window.location.reload();
        } else {
          const json = await response.json();
          // Handle error response
          console.error(json.error);
        }
      } catch (error) {
        // Handle fetch error
        console.error(error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <tr className="delTableDataRow" key={payment._id}>
      <td className="delTableDataCell">{payment._id}</td>
      <td className="delTableDataCell">{payment.createdAt && (
    <>
      <div>Date: {new Date(payment.createdAt).toLocaleDateString()}</div>
      <div>Time: {new Date(payment.createdAt).toLocaleTimeString()}</div>
    </>
  )}</td>
      <td className="delTableDataCell">{payment.address}</td>
      <td className="delTableDataCell">{payment.district}</td>
      <td className="delTableDataCell">{payment.country}</td>
      <td className="delTableDataCell">{payment.dmethod}</td>
      <td className="delTableDataCell">
        <input
          className="delTableRadio"
          type="radio"
          name={'status_' + payment._id}
          value="Pending"
          checked={payment.dStatus === 'Pending'}
          onChange={(e) => handleStatusChange(e)}
        />
        <label for="pending">Pending</label>

        <input
          className="delTableRadio"
          type="radio"
          name={'status_' + payment._id}
          value="In Process"
          checked={payment.dStatus === 'In Process'}
          onChange={(e) => handleStatusChange(e)}
        />
        <label for="inprocess">In Process</label>

        <input
          className="delTableRadio"
          type="radio"
          name={'status_' + payment._id}
          value="Delivered"
          checked={payment.dStatus === 'Delivered'}
          onChange={(e) => handleStatusChange(e)}
        />
        <label for="delivered">Delivered</label>

        <input
          className="delTableRadio"
          type="radio"
          name={'status_' + payment._id}
          value="Picked Up"
          checked={payment.dStatus === 'Picked Up'}
          onChange={(e) => handleStatusChange(e)}
        />
        <label for="pickedUp">Picked Up</label>
      </td>
      <td>
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'DELETE'}
        </button>
      </td>
    </tr>
  );
};

export default AdminDelivery;
