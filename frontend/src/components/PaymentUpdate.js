import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const PaymentUpdate = () => {


    const [amount, setAmount] = useState('')
    const [userID, setUserID] = useState('')
    const [orderID, setOrderID] = useState('')
    const [address, setAddress] = useState('')
    const [district, setDistrict] = useState('')
    const [country, setCountry] = useState('')
    const [phoneNo, setPhoneNo] = useState('')
    const [error, setError] = useState(null)

    const {id} = useParams()

    useEffect(() => {
        const fetchPaymentsUpdate = async () => {
            const response = await fetch(`/api/payments/${id}`)
            const json = await response.json()
            if (response.ok) {
                setAddress(json.address)
                setAmount(json.amount)
                setDistrict(json.district)
                setCountry(json.country)
                setPhoneNo(json.phoneNo)
                setOrderID(json.orderID)
                setUserID(json.userID)

                setError(null)
            }
        }
        fetchPaymentsUpdate()
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/payments/${id}` ,{
            method: 'PATCH',
            body: JSON.stringify({
                address: address,
                district: district,
                country: country,
                phoneNo: phoneNo,
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

            setAddress(json.address)
            setCountry(json.country)
            setDistrict(json.district)
            setPhoneNo(json.phoneNo)
            setError(null)

            console.log('Updated!', json)
        }
    }

    return (
        <div className="lightBlueBodyBG">
            <div className="whiteBodyBG">
                <div className="darkBlueTopicBox">
                    <h3 className="pageTopic">Page Topic Here</h3>
                </div>

                <form className="edit" onSubmit={handleUpdate}>

                    <div className="col">
                        <div className="row">
                            <label>Payment Amount: </label>
                            <input type="number"
                                onChange={(e) => setAmount(e.target.value)}
                                value={amount} />

                            <label> User ID : </label>
                            <input type="number"
                                onChange={(e) => setUserID(e.target.value)}
                                value={userID} />

                            <label> Order ID : </label>
                            <input type="number"
                                onChange={(e) => setOrderID(e.target.value)}
                                value={orderID} />

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
