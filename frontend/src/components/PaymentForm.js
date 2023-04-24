import { useState } from "react"
import { Navigate } from "react-router-dom"
import '../CSS/Payment.css';

const PaymentForm = () => {

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

    if (gotoPaymentlist){
        return(
            <Navigate to= "/MyPayments" />
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payment = {user: JSON.parse(localStorage.getItem('userInfo'))?._id || null, orderID, amount:JSON.parse(localStorage.getItem('TamountInfo')) , pmethod, dmethod, address,district, country ,phoneNo, dStatus}

        const response = await fetch('/api/payments' , {
            method:'POST' ,
            body: JSON.stringify(payment),
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
          setError(json.error)
        }
        if(response.ok){
            setAmount('')
            setPmethod('')
            setDmethod('')
            setAddress('')
            setDistrict('')
            setCountry('')
            setPhoneNo('')
            setStatus('')
            setError(null)
            console.log('new payment added' , json)
        }
    }
    
    const handlePaymentMethodChange = (e) => {
        setPmethod(e.target.value);
      }

    const handleDeliveryMethodChange = (e) => {
        setDmethod(e.target.value);
      }

    const handleCardNoChange = (e) => {
        const inputValue = e.target.value;
        // Remove all non-numeric characters from the input value
        const sanitizedValue = inputValue.replace(/\D/g, '');
        // Set the sanitized value to the state
        setCardNO(sanitizedValue);
      } 

      const handleExMonthChange = (e) => {
        const inputValue = e.target.value;
        // Check if input value is a valid month (1 to 12)
        if (/^(0?[1-9]|1[0-2])$/.test(inputValue)) {
          setExMonth(inputValue);
        }
      };  

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


      const handleSecCodeChange = (event) => {
        const inputSecCode = event.target.value;
        
        const numericSecCode = inputSecCode.replace(/\D/g, '');
        const trimmedSecCode = numericSecCode.slice(0, 4);
        setSecCode(trimmedSecCode);
      }


    return (

        <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
            <div className="darkBlueTopicBox">
                <h3 className="pageTopic">PAYMENT FORM</h3>
            </div>

            <div className="container">

        <form className="create" onSubmit={handleSubmit}>

<div className="row">

            <div className="col">

                <h3><strong>Payment Details </strong></h3>
        
        <label> Payment Amount : </label>
                <input type="text"
                onChange={(e) => setAmount(e.target.value)}
                value={JSON.parse(localStorage.getItem('TamountInfo'))}
                />
        
        {/* <label> Payment Method : </label>
                <input type="text"
                onChange={(e) => setPmethod(e.target.value)}
                value={pmethod}
                /> */}
        
  <div className="Pmeth">
        <label>Payment Method:</label>
      <label htmlFor="paymentMethodCash">Credit card</label>
      <input
        type="radio"
        id="paymentMethodCash"
        name="paymentMethod"
        value="Credit card"
        checked={pmethod === 'Credit card'}
        onChange={handlePaymentMethodChange}
      />
      
      <label htmlFor="paymentMethodCard">Debit card</label>
      <input
        type="radio"
        id="paymentMethodCard"
        name="paymentMethod"
        value="Debit card"
        checked={pmethod === 'Debit card'}
        onChange={handlePaymentMethodChange}
      />
      
  </div>

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

<div className="col">

            <h3><strong>Delivery details</strong></h3>
        
  <div className="Dmeth">

    <label>Delivery Method:</label>

    <label htmlFor="deliveryMethodDelivery">Delivery</label>
      <input
        type="radio"
        id="deliveryMethodDelivery"
        name="deliveryMethod"
        value="Delivery"
        checked={dmethod === 'Delivery'}
        onChange={handleDeliveryMethodChange}
      />
      
    <label htmlFor="deliveryMethodPickup">Pickup</label>
      <input
        type="radio"
        id="deliveryMethodPickup"
        name="deliveryMethod"
        value="Pickup"
        checked={dmethod === 'Pickup'}
        onChange={handleDeliveryMethodChange}
      />
      
  </div>
                
        <label> Address : </label>
                <input type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                />
        
        <label> District : </label>
                <input type="text"
                onChange={(e) => setDistrict(e.target.value)}
                value={district}
                />
        
        <label> Country : </label>
                <input type="text"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
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

            </div>
            </div>
               </form>

            <button onClick={() => {setGotopaymentList(true)}}>MY PAYMENTS</button>

            </div>
        </div>
    </div>

       
    )
}

export default PaymentForm