import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import '../CSS/Payment.css';

const PaymentUpdate = () => {


    const [amount, setAmount] = useState('')
   //   const [users, setUsers] = useState('')
    const [orderID, setOrderID] = useState('')
    const [dmethod, setDmethod ] = useState('')
    const [address, setAddress] = useState('')
    const [district, setDistrict] = useState('')
    const [country, setCountry] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [error, setError] = useState(null)

    const {id} = useParams()

  //  const [payments , setPayments] = useState(null)

  const [payment, setPayment] = useState({ user: { _id: '' } });
  const [users, setUsers] = useState([]);


    useEffect(() => {
        const fetchPaymentsUpdate = async () => {
            const response = await fetch(`/api/payments/${id}`)
            const json = await response.json()
            if (response.ok) {
                setDmethod(json.dmethod)
                setAddress(json.address)
                setAmount(json.amount)
                setDistrict(json.district)
                setCountry(json.country)
                setPhoneNo(json.phoneNo)
                setOrderID(json.orderID)
                setUsers(json.user)

                setError(null)
            }
        }
        fetchPaymentsUpdate()
    }, [])

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
    
    // const handleDeliveryMethodChange = (e) => {
    //     setDmethod(e.target.value);
    //   };
    

    const handleDeliveryMethodChange = (e) => {
        const selectedMethod = e.target.value;
        if (selectedMethod === "Pickup") {
          const confirmed = window.confirm(
            "Are you sure you want to change the delivery method to Pickup? This will delete the delivery details."
          );
          if (confirmed) {
            setDmethod(selectedMethod);
            setAddress("");
            setDistrict("");
            setCountry("");
            setPhoneNo("");
          }
        } else {
          setDmethod(selectedMethod);
        }
      };
      

    const handleUpdate = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/payments/${id}` ,{
            method: 'PATCH',
            body: JSON.stringify({
                dmethod : dmethod,
                address : address,
                district: district,
                country : country,
                phoneNo : phoneNo,
            }),

            headers: {
                'Content-Type': 'application/json'
            },
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setDmethod(json.dmethod)
            setAddress(json.address)
            setCountry(json.country)
            setDistrict(json.district)
            setPhoneNo(json.phoneNo)
            setError(null)

            console.log('Updated!', json)
            window.location.reload();
        }
    }

    return (
        <div className = "lightBlueBodyBG">
        <div className = "whiteBodyBG">
        <div className = "darkBlueTopicBox">
        <h3  className = "pageTopic">UPDATE PAYMENT</h3>
                </div>

                <form className="edit" onSubmit={handleUpdate}>

                    <div className="col">
                        <div className="row">
                            <label>Payment Amount: </label>
                            <input type="number"
                                onChange={(e) => setAmount(e.target.value)}
                                value={amount} />

                            <label> User ID : </label>
                            {/* <input 
                                onChange={(e) => setUsers(e.target.value)}
                                value={users.find((user) => user._id === payment.user)?._id} /> */}

                        <input
                                onChange={(e) => {
                                const selectedUserId = e.target.value;
                                const selectedUser   = users.find((user) => user.id === selectedUserId);
                                setPayment({
                                    ...payment,
                                    user: selectedUser || { id: '' },
                                });
                                }}
                                value = {payment.user.id}
                            />

                            {/* <label> Order ID : </label>
                            <input type="number"
                                onChange={(e) => setOrderID(e.target.value)}
                                value={orderID} /> */}


                        </div>

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

export default PaymentUpdate
