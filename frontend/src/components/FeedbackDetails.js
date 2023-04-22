import { useFeedbacksContext } from "../hooks/useFeedbackContext"
import { Link } from 'react-router-dom'
import StarRating from 'react-star-ratings';

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const FeedbackDetails = ({feedback}) =>{

  const { dispatch } = useFeedbacksContext()

  const handleClick = async () => {
    const response = await fetch('/api/feedbacks/' +feedback._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if(response.ok) {
       dispatch({type: 'DELETE_FEEDBACK', payload: json})
    }
  }


  return (
    <div className="feedback-details">
      <h4>{feedback.gemType}</h4>
      <p><strong>Gem Quantity: </strong>{feedback.gemQty}</p>
      <p><strong>Feedback: </strong>{feedback.fbInfo}</p>
      {/* <p><strong>Rating: </strong>{feedback.rating}</p> */}
      <StarRating 
                    readOnly
                    id="rating"
                    name="rating"
                    rating = {Number(feedback.rating)}                    
                    starRatedColor="#0a2647"
                    starHoverColor="orange"
                    starDimension="25px"
                    starSpacing="5px"
                    
                />
      <p>{formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick = {handleClick}>delete</span>
      {/* <Link to = {"/UpdateFeedback/:_id"}> */}
      <Link to = {`/UpdateFeedback/${feedback._id}`}>
      <span >Update</span>
      </Link>
      
    </div>
  )

}

export default FeedbackDetails