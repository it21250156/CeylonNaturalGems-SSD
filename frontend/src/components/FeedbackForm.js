import { useEffect, useState } from "react"
import { useFeedbacksContext } from '../hooks/useFeedbackContext'
import StarRating from 'react-star-ratings';
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";

const FeedbackForm = () => {
  const { _id } = useParams()
  const { dispatch } = useFeedbacksContext()

  const [payment, setPayment] = useState('')
  const [orders, setOrders] = useState('')
  const [gemType, setGemType] = useState('')
  const [gemQty, setGemQty] = useState('')
  const [fbInfo, setFbInfo] = useState('')
  const [rating, setRating] = useState(0)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const nav = useNavigate()

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const feedback = { gemType, gemQty, fbInfo, rating, user: JSON.parse(localStorage.getItem('userInfo'))?._id || null }

    const response = await fetch('/api/feedbacks', {
      method: 'POST',
      body: JSON.stringify(feedback),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setGemType('')
      setGemQty('')
      setFbInfo('')
      setRating(0)
      setError(null)
      setEmptyFields([])
      console.log('new feedback added', json)
      console.log(response)
      dispatch({ type: 'CREATE_FEEDBACK', payload: json })

      nav('/Userfeedbacks')
    }
  }
  useEffect(() => {

    const getPayments = async () => {

      try {
        const paym = await axios.get(`http://localhost:4000/api/payments/${_id}`)
        setPayment(paym)

        const ord = await payment.data.orderId.map(order => {

          axios.get(`http://localhost:4000/api/cart/${_id}`)

            .then(result => {

              setOrders([ ...orders, result.data])

            })

        })

        setOrders(ord)
      }

      catch (e) {
        console.log('e', e)
      }
    }
    getPayments()
  }, [])

  return (

    <form className="create" onSubmit={handleSubmit} enctype="multipart/form-data">

      <br /><br />
      {JSON.stringify(payment.data)}
      <label>Gem/Jewellery Name:</label>
      {/* <input
        type="text"
        onChange={(e) => setGemType(e.target.value)}
        value={gemType}
        className={emptyFields?.find(f => f === 'gemType') ? 'error' : ''}
      /> */}
      {JSON.stringify(orders)}
      <br /><br />

      <label>Gem Quantity:</label>
      <input
        type="number"
        onChange={(e) => setGemQty(e.target.value)}
        value={gemQty}
        className={emptyFields?.find(f => f === 'gemQty') ? 'error' : ''}
      />
      <br /><br />

      <label>Type Feedback:</label>
      <br />
      <textarea name="feedbackContent" cols="100" rows="10"
        onChange={(e) => setFbInfo(e.target.value)}
        value={fbInfo}
        className={emptyFields?.find(f => f === 'fbInfo') ? 'error' : ''}
      ></textarea>
      <br /><br />

      <label>Add Star Rating:</label>
      <StarRating
        id="rating"
        name="rating"
        rating={rating}
        starRatedColor="#0a2647"
        starHoverColor="orange"
        starDimension="25px"
        starSpacing="5px"
        changeRating={handleRatingChange}
      />
      <br /><br />

      <label>Upload Images:</label>
      <input type="file" name="image" accept="image/jpg, image/jpeg, image/png"></input>

      <br /><br />
      <br /><br />


      <button type="submit">Add Feedback</button>
      {error && <div className="error">{error}</div>}

    </form>

  )
}

export default FeedbackForm
