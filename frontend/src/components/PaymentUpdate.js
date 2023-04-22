import { useState } from "react"

const PaymentUpdate = () => {

   const [amount, setAmount] = useState('')
   const [userID, setUserID] = useState('')
   const [orderID, setOrderID] = useState('')
   const [address, setAddress] = useState('')
   const [district, setDistrict] = useState('')
   const [country, setCountry] = useState('')
   const [phoneNo, setPhoneNo] = useState('')

   const handleUpdate = async (e) => {
     e.preventDefault()

    // const updatedP = {amount, }
   }

    return(
        <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
            <div className="darkBlueTopicBox">
                <h3 className="pageTopic">Page Topic Here</h3>
            </div>
            
        <form className="edit" onSubmit={handleUpdate}>

            <div className="col">
                <div className="row">
<label>Payment Amount: </label>
                    <input type="Number"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}/>

<label> User ID : </label>
                    <input type="Number"
                    onChange={(e) => setUserID(e.target.value)}
                    value={userID}/>

<label> Order ID : </label>
                    <input type="Number"
                    onChange={(e) => setOrderID(e.target.value)}
                    value={orderID}/>

                </div>

<div className="row">
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
        
        <label> Phone Number : </label>
                <input type="text"
                onChange={(e) => setPhoneNo(e.target.value)}
                value={phoneNo}
                />
</div>

<button type="submit"> UPDATE PAYMENT </button>
            {error && <div className="error"> {error}</div>}

            </div>

        </form>

        </div>
    </div>
    )
}