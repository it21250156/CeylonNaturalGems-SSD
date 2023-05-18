import { useState } from "react";
import { usePlansContext } from "../hooks/usePlanContext";
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const PlanForm = () => {
  const { dispatch } = usePlansContext();

  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [months, setMonths] = useState("");
  const [initialPayment, setInitialPayment] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const plan = { name, months, initialPayment };

    const response = await fetch('/api/plans', {
      method: 'POST',
      body: JSON.stringify(plan),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setName('');
      setMonths('');
      setInitialPayment('');
      setError(null);
      dispatch({ type: 'CREATE_PLANS', payload: json });

      Swal.fire('Success', 'New plan added.', 'success').then(() => {
        navigate(location.state?.from || '/AdminInstallmentPlans');
        window.location.reload();
      });
    }
  };

  return (
    <form className="create-plans" onSubmit={handleSubmit}>
      <h3> Add a new installment plan </h3>

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
            setError("Initial payment must be a percentage value (less than 100)");
          }
        }}
        value={initialPayment}
      />
      {error && <div className="error">{error}</div>}

      <button className="confirm-btn">Add Installment Plan</button>

      {/* {error && <div className="error">{error}</div>} */}
    </form>
  );
};

export default PlanForm;
