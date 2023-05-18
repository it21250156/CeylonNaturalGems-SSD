import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { usePlansContext } from "../hooks/usePlanContext";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import React from "react";
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import Swal from 'sweetalert2';

const AdminUpdatePlan = () => {
  const { dispatch } = usePlansContext();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [months, setMonths] = useState('');
  const [initialPayment, setInitialPayment] = useState('');
  const [error, setError] = useState(null);

  const [plans, setPlans] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchPlans = async () => {
      const response = await fetch(`/api/plans/${id}`);
      const json = await response.json();

      if (response.ok) {
        setPlans(json);
        setName(json.name);
        setMonths(json.months);
        setInitialPayment(json.initialPayment);
        setError(null);
      }
    };

    fetchPlans();
  }, []);

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/plans/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        months: months,
        initialPayment: initialPayment,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setName(json.name);
      setMonths(json.months);
      setInitialPayment(json.initialPayment);
      setError(null);
      // dispatch({type: 'UPDATE_PLANS' , payload: json})

      Swal.fire({
        icon: 'success',
        title: 'Plan Updated',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        navigate('/AdminInstallmentPlans');
      });
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

      <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
          <div className="darkBlueTopicBox">
            <h3 className="pageTopic">Update installment plan</h3>
          </div>
          <form className="create-plans" onSubmit={handleSubmit}>
            <label>Plan name:</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <label>Number of months:</label>
            <input
              type="number"
              onChange={(e) => setMonths(e.target.value)}
              value={months}
            />

            <label>Initial payment (as a percentage):</label>
            <input
              type="number"
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value < 100) {
                  setInitialPayment(value);
                } else {
                  setError("Initial payment must be less than 100");
                }
              }}
              value={initialPayment}
            />

            <button className="confirm-btn">Save changes</button>

            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminUpdatePlan;
