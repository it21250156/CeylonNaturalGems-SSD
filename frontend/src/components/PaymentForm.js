<<<<<<< Updated upstream
import { useState } from "react"
import { Navigate } from "react-router-dom"
import '../CSS/Payment.css';
=======
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Header from './Header';
import '../CSS/PaymentForm.css';
>>>>>>> Stashed changes

const PaymentForm = () => {
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
  const [dStatus, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [gotoPaymentlist, setGotopaymentList] = useState(false);

<<<<<<< Updated upstream
  const [isValid, setIsValid] = useState(true);
  const [user, setUser] = useState('')
  const[orderID, setOrderID ] = useState('')
    const [amount , setAmount] = useState('')
    const [pmethod , setPmethod] = useState('')
    const [ cardNo , setCardNO] = useState('')
    const [ cardName , setCardName] = useState('')
    const [ exMonth , setExMonth] = useState('')
    const [ exYear , setExYear] = useState('')
    const [ secCode , setSecCode] = useState('')
    const [dmethod , setDmethod] = useState('')
    const [address , setAddress] = useState('')
    const [district , setDistrict] = useState('')
    const [country , setCountry] = useState('')
    const [phoneNo , setPhoneNo] = useState('')
    const [dStatus, setStatus] = useState('')
    const [error , setError] = useState(null)
    const [gotoPaymentlist , setGotopaymentList] = useState(false)
=======
  if (gotoPaymentlist) {
    return <Navigate to="/MyPayments" />;
  }
>>>>>>> Stashed changes

  const handleSubmit = async (e) => {
    e.preventDefault();

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

<<<<<<< Updated upstream
      const handleExYearChange = (e) => {
        const inputValue = e.target.value;
        // Check if input value is a valid year (4 digits starting from 20)
        if (/^20\d{2}$/.test(inputValue)) {
          setExYear(inputValue);
        }
      };
      

      const handlePhoneNoChange = (e) => {
        const inputPhoneNo = e.target.value;
        setPhoneNo(inputPhoneNo);
    
        // Regular expression pattern for validating phone numbers with multiple country codes
        const phoneNoPattern = /^(\+|00)(1|91|44|61|65|86)(\d{6,16})$/;
    
        setIsValid(phoneNoPattern.test(inputPhoneNo));
      };
=======
  const handleExMonthChange = (e) => {
    const inputValue = e.target.value;
    // Check if input value is a valid month (1 to 12)
    if (/^(0?[1-9]|1[0-2])$/.test(inputValue)) {
      setExMonth(inputValue);
    }
  };

  const handleExYearChange = (e) => {
    const inputValue = e.target.value;
    // Check if input value is a valid year (current year or future years)
    const currentYear = new Date().getFullYear();
    if (/^20.{2}$/.test(inputValue) && parseInt(inputValue) >= currentYear) {
      setExYear(inputValue);
    }
  };
>>>>>>> Stashed changes

  // const handleSecCodeChange = (e) => {
  //   const inputValue = e.target.value;
  //   // Check if input value is a valid 4-digit number
  //   if (/^\d{4}$/.test(inputValue)) {
  //     setSecCode(inputValue);
  //   }
  // };

  const handleSecCodeChange = (event) => {
    const inputSecCode = event.target.value;

    const numericSecCode = inputSecCode.replace(/\D/g, '');
    const trimmedSecCode = numericSecCode.slice(0, 4);
    setSecCode(trimmedSecCode);
  };

  return (
    <>
      <Header />
      <div className="title-box-payment">
        <h3 className="title-payment">PAYMENT FORM</h3>
      </div>
      <div className="light-blue-bg">
        <form className="create" onSubmit={handleSubmit}>
          <div className="form-fields">
            <div className="col-1">
              <p className="column-title">Payment Details</p>

              <label className="label"> Payment Amount : </label>
              <input
                id="input"
                type="text"
                onChange={(e) => setAmount(e.target.value)}
                value={JSON.parse(localStorage.getItem('TamountInfo'))}
              />

              {/* <label> Payment Method : </label>
                <input
                id='input' type="text"
                onChange={(e) => setPmethod(e.target.value)}
                value={pmethod}
                /> */}

<<<<<<< Updated upstream
<label>Card Number:</label>
      <input
        type="number" // Use text type to allow input of non-numeric characters
        pattern="[0-9]{13,19}" // Use a pattern attribute to specify the allowed input format
        title="Please enter a valid card number" // Display a tooltip with a custom error message
        onChange={handleCardNoChange} // Call a custom handler to sanitize the input value
        value={cardNo}
      />            
        
        <label> Card Holder's Name : </label>
                    <input type="text"
                    onChange={(e) => setCardName(e.target.value)}
                    value={cardName}
                    />
        
        <label>Expiry Month:</label>
      <input
        type="number"
        onChange={handleExMonthChange}
        value={exMonth}
      />
        
        <label>Expiry Year:</label>
      <input
        type="number"
        onChange={(e) => setExYear(e.target.value)}
        value={exYear}
      />
        
        <label>Security Code:</label>
      <input
        type="number"
        onChange={handleSecCodeChange}
        value={secCode}
      />
                   </div>
=======
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
>>>>>>> Stashed changes

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

            <div className="col-2">
              <p className="column-title">Delivery Details</p>

              <div className="Dmeth">
                <label className="label">Delivery Method:</label>

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
<<<<<<< Updated upstream
                />
        
        {/* <label> Phone Number : </label>
                <input type="text"
                onChange={(e) => setPhoneNo(e.target.value)}
                value={phoneNo}
                /> */}

<label>Phone Number:</label>
      <input
        type="text"
        onChange={handlePhoneNoChange}
        value={phoneNo}
      />
      {!isValid && <small>Please enter a valid phone number with country code (+1, +91, +44, +61, +65, +86, etc.)</small>}
        
            <button> CONFIRM PAYMENT </button>
            {error && <div className="error"> {error}</div>}
=======
              />

              <label className="label"> Phone Number : </label>
              <input
                id="input"
                type="text"
                onChange={(e) => setPhoneNo(e.target.value)}
                value={phoneNo}
              />
>>>>>>> Stashed changes

              <button className="confirm-btn"> CONFIRM PAYMENT </button>
              {error && <div className="error"> {error}</div>}
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
    </>
  );
};

export default PaymentForm;
