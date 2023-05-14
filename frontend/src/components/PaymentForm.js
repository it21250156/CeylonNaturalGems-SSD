import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from './Header';
import '../CSS/PaymentForm.css';
import { useAuthContext } from '../hooks/useAuthContext';

const PaymentForm = () => {
  const { cartData } = useAuthContext();

  const [user, setUser] = useState('');
  const [orderID, setOrderID] = useState('');
  const [amount, setAmount] = useState('');
  const [pmethod, setPmethod] = useState('');
  const [cardNo, setCardNO] = useState('');
  const [cardName, setCardName] = useState('');
  const [exMonth, setExMonth] = useState('');
  const [exYear, setExYear] = useState('');
  const [secCode, setSecCode] = useState('');
  const [dmethod, setDmethod] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [dStatus, setStatus] = useState('Pending');
  const [error, setError] = useState(null);
  const [gotoPaymentlist, setGotopaymentList] = useState(false);

  const [successMessage, setSuccessMessage] = useState(false); 

  if (gotoPaymentlist) {
    return <Navigate to="/MyPayments" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(cartData) {
      setOrderID(cartData?.map(cart => cart.cartitemid))
    }

    if (!cardNo || !cardName || !exMonth || !exYear || !secCode ) {
      setError('Please fill in all required fields');
      return; // Prevent form submission if any field is invalid
    }
    
    const payment = {
      user: JSON.parse(localStorage.getItem('userInfo'))?._id || null,
      orderID,
      amount: JSON.parse(localStorage.getItem('TamountInfo')),
      pmethod,
      dmethod,
      address,
      district,
      country,
      phoneNo,
      dStatus,
    };

    const response = await fetch('/api/payments', {
      method: 'POST',
      body: JSON.stringify(payment),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setAmount('');
      setPmethod('');
      setDmethod('');
      setAddress('');
      setDistrict('');
      setCountry('');
      setPhoneNo('');
      setStatus('');
      setError(null);
      console.log('new payment added', json);

      setSuccessMessage(true);  // Set success message state variable to true
      setTimeout(() => {
        setSuccessMessage(false); // Hide success message after a certain duration
      }, 3000);
    }
};

  const handlePaymentMethodChange = (e) => {
    setPmethod(e.target.value);
  };

  const handleDeliveryMethodChange = (e) => {
    setDmethod(e.target.value);
  };

  const handleCardNoChange = (e) => {
    const inputValue = e.target.value;
    // Remove all non-numeric characters from the input value
    const sanitizedValue = inputValue.replace(/\D/g, '');
    // Set the sanitized value to the state
    setCardNO(sanitizedValue);
  };

  const handleExMonthChange = (e) => {
    const inputValue = e.target.value;
    // Check if input value is a valid month (1 to 12)
    if (/^(0?[1-9]|1[0-2])$/.test(inputValue) && !exMonth) {
      setExMonth(inputValue);
    }else{
      setError("Expiary month is required!")
    }
  };

  const handleExYearChange = (e) => {
    const inputValue = e.target.value;
    // Check if input value is a valid year (current year or future years)
    // const currentYear = new Date().getFullYear();
    // if (/^20.{2}$/.test(inputValue) && parseInt(inputValue) >= currentYear) {
      setExYear(inputValue);
    // }
  };

  const handleSecCodeChange = (event) => {
    const inputSecCode = event.target.value;

    const numericSecCode = inputSecCode.replace(/\D/g, '');
    const trimmedSecCode = numericSecCode.slice(0, 4);
    setSecCode(trimmedSecCode);
  };

  const handleConfirmPayment = () => {
    if (dmethod === 'Delivery') {
      if (!address || !district || !country) {
        setError('Please fill in all required fields');
      } 
    } 
  };

  const amountInfo = localStorage.getItem('TamountInfo');
  const parsedAmountInfo = amountInfo ? JSON.parse(amountInfo) : '';

  return (
    <>
      <Header />
      <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
          <div className="darkBlueTopicBox">
            <h3 className="pageTopic">PAYMENT FORM</h3>
          </div>
          <div className="container">
            <form className="create" onSubmit={handleSubmit}>
              <div className="form-fields">
                <div className="col-1">
                  <p className="column-title">Payment Details</p>

                  <label className="label"> Payment Amount : </label>
                  <input
                    id="input"
                    type="text"
                    onChange={(e) => setAmount(e.target.value)}
                   // value={JSON.parse(localStorage.getItem('TamountInfo'))}
                   value={parsedAmountInfo}
                  />

                  <div className="Pmeth">
                    <label className="label">Payment Method:</label>
                    <label htmlFor="paymentMethodCash" className="label">
                      Credit card
                    </label>
                    <input
                      className="label"
                      type="radio"
                      id="paymentMethodCash"
                      name="paymentMethod"
                      value="Credit card"
                      checked={pmethod === 'Credit card'}
                      onChange={handlePaymentMethodChange}
                    />

                    <label htmlFor="paymentMethodCard" className="label">
                      Debit card
                    </label>
                    <input
                      type="radio"
                      id="paymentMethodCard"
                      name="paymentMethod"
                      value="Debit card"
                      checked={pmethod === 'Debit card'}
                      onChange={handlePaymentMethodChange}
                    />
                  </div>

                  <label className="label">Card Number:</label>
                  <input
                    id="input"
                    type="number" // Use text type to allow input of non-numeric characters
                    pattern="[0-9]{13,19}" // Use a pattern attribute to specify the allowed input format
                    title="Please enter a valid card number" // Display a tooltip with a custom error message
                    onChange={handleCardNoChange} // Call a custom handler to sanitize the input value
                    value={cardNo}
                  />

                  <label className="label"> Card Holder's Name : </label>
                  <input
                    id="input"
                    type="text"
                    onChange={(e) => setCardName(e.target.value)}
                    value={cardName}
                  />

                  <label className="label">Expiry Month:</label>
                  <input
                    id="input"
                    type="number"
                    onChange={handleExMonthChange}
                    value={exMonth}
                  />

                  <label className="label">Expiry Year:</label>
                  <input
                    id="input"
                    type="number"
                    onChange={handleExYearChange}
                    value={exYear}
                  />

                  <label className="label">Security Code:</label>
                  <input
                    id="input"
                    type="number"
                    onChange={handleSecCodeChange}
                    value={secCode}
                  />
                </div>


<div className = "col-2">
<p   className = "column-title">Delivery Details</p>

      <div className="Dmeth">
        <label className="label">Delivery Method:</label>
        <span style={{ fontSize: 'small' }}>
  If you choose to pick up the order from our store no need to fill delivery details below!
</span>
        <label className="label" htmlFor="deliveryMethodDelivery">
          Delivery
        </label>
        <input
          type="radio"
          id="deliveryMethodDelivery"
          name="deliveryMethod"
          value="Delivery"
          checked={dmethod === 'Delivery'}
          onChange={handleDeliveryMethodChange}
        />

        <label className="label" htmlFor="deliveryMethodPickup">
          Pickup
        </label>
        <input
          type="radio"
          id="deliveryMethodPickup"
          name="deliveryMethod"
          value="Pickup"
          checked={dmethod === 'Pickup'}
          onChange={handleDeliveryMethodChange}
        />
      </div>

      <label className="label"> Address : </label>
      <input
        id="input"
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        value={address}
        disabled={dmethod === 'Pickup'}
      />

      <label className="label"> District : </label>
      <input
        id="input"
        type="text"
        onChange={(e) => setDistrict(e.target.value)}
        value={district}
        disabled={dmethod === 'Pickup'}
      />

      <label className="label"> Country : </label>
      <input
        id="input"
        type="text"
        onChange={(e) => setCountry(e.target.value)}
        value={country}
        disabled={dmethod === 'Pickup'}
      />

      <label className="label"> Phone Number : </label>
      <input
        id="input"
        type="text"
        onChange={(e) => setPhoneNo(e.target.value)}
        value={phoneNo}
      />

      <button className="confirm-btn" onClick={handleConfirmPayment}>
        CONFIRM PAYMENT
      </button>

      {dmethod === 'Pickup' && (
        <div className="popup">
          <p>Please come to our store to pick up your order.</p>
        </div>
      )}

      {dmethod === 'Delivery' && error && (
        <div className="error">{error}</div>
      )}

{successMessage && (
                  <div className="success">Data entered successfully!</div>
                )}

    </div>

              </div>
            </form>

            {/* <button
              onClick={() => {
                setGotopaymentList(true);
              }}
            >
              MY PAYMENTS
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default PaymentForm;
