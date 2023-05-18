import { useEffect, useState } from 'react';
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
  const [isChecked, setIsChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [phoneNoError, setPhoneNoError] = useState('');

  useEffect(() => {
    setOrderID(cartData?.map((cart) => cart.cartitemid));
  }, [cartData]);

  if (gotoPaymentlist) {
    return <Navigate to="/MyPayments" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cartData) {
      return;
    }

    if (!cardNo || !cardName || !exMonth || !exYear || !secCode) {
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

      try {
        await fetch(`/api/cart/user/${payment.user}`, {
          method: 'DELETE',
        });
        window.location.href = '/MyPayments';
      } catch (error) {
        console.log('error', error);
      }

      setSuccessMessage(true); // Set success message state variable to true
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
    if (sanitizedValue.length <= 16) {
      setCardNO(sanitizedValue);
    }
  };

  const handleExMonthChange = (e) => {
    const inputValue = e.target.value;
    // Check if input value is a valid month (1 to 12)
    if (inputValue >= 1 && inputValue <= 12) {
      setExMonth(inputValue);
    }
  };

  const handleExYearChange = (e) => {
    const inputValue = e.target.value;
    setExYear(inputValue);
  };

  const handleSecCodeChange = (event) => {
    const inputSecCode = event.target.value;

    const numericSecCode = inputSecCode.replace(/\D/g, '');
    const trimmedSecCode = numericSecCode.slice(0, 4);
    setSecCode(trimmedSecCode);
  };

  const handleConfirmPayment = () => {
    if (dmethod === 'Deliver') {
      if (!address || !district || !country) {
        setError('Please fill in all required fields');
      }
    }

    if (isChecked) {
      // Perform the payment processing logic here
      console.log('Payment submitted!');
    } else {
      // Handle case when checkbox is not checked
      alert('Please check the checkbox to confirm.');
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/; // Regular expression for a 10-digit phone number

    if (!phoneNumberRegex.test(phoneNumber)) {
      setPhoneNoError('Please enter a valid 10-digit phone number');
    } else {
      setPhoneNoError('');
    }
  };

  const handlePhoneNoChange = (e) => {
    const inputValue = e.target.value;
    // Remove all non-numeric characters from the input value
    const sanitizedValue = inputValue.replace(/\D/g, '');
    setPhoneNo(sanitizedValue);
    validatePhoneNumber(sanitizedValue);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
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
          <div className="light-blue-main-box">
            <form className="create" onSubmit={handleSubmit}>
              <div className="form-fields">
                <div className="col-1-p-from">
                  <p className="column-title">Payment Details</p>
                  <br></br>

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
                    pattern="[0-9]" // Use a pattern attribute to specify the allowed input format
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

                <div className="col-2-p-from">
                  <p className="column-title">Delivery Details</p>

                  <div className="Dmeth">
                    <label className="label">Delivery Method:</label>
                    <span style={{ fontSize: 'small' }}>
                      Fill the delivery details that will appear below if you
                      need your order to be delivered!
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

                  {/* <label className="label"> Address : </label>
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
                  /> */}

                  {dmethod === 'Delivery' && (
                    <>
                      <label className="label"> Address : </label>
                      <input
                        id="input"
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                      />

                      <label className="label"> District : </label>
                      <input
                        id="input"
                        type="text"
                        onChange={(e) => setDistrict(e.target.value)}
                        value={district}
                      />

                      <label className="label"> Country : </label>
                      <input
                        id="input"
                        type="text"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                      />
                    </>
                  )}

                  <label className="label"> Phone Number : </label>
                  <input
                    id="input"
                    type="tel"
                    onChange={handlePhoneNoChange}
                    value={phoneNo}
                  />
                  {phoneNoError && <div className="error">{phoneNoError}</div>}

                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        required
                      />
                      I have read and agreed to the terms and conditions of this
                      website.
                    </label>
                  </div>

                  <button
                    className="confirm-btn"
                    onClick={handleConfirmPayment}
                    disabled={!isChecked}
                  >
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
                    <div className="success">Payment done successfully!</div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default PaymentForm;
