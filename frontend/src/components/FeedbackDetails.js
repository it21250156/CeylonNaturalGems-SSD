import { useFeedbacksContext } from "../hooks/useFeedbackContext"
import { Link } from 'react-router-dom'
import StarRating from 'react-star-ratings';
import axios from 'axios';

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useEffect, useState } from "react";

const FeedbackDetails = ({feedback}) =>{

  const[feedbackReply,setFeedbackReply] = useState('')
  
  useEffect (()=> {
  
    setFeedbackReply(feedback?.reply || '')

  },[])

  const { dispatch,feedbacks } = useFeedbacksContext()

  const handleFeedbackReply = async(e,fid) => {

  e.preventDefault()

    const response = await fetch('/api/feedbacks/' +feedback._id, {
      method: 'PATCH',
      body: JSON.stringify({

       reply:feedbackReply

    }),
    headers: {
        'Content-Type': 'application/json'
    }
       
    },)
    const json = await response.json()
    console.log(json)

    if(response.ok) {
      
      dispatch({type: 'UPDATE_FEEDBACK', payload: json})
   
    }

  }

  const handleClick = async () => {
    const response = await fetch('/api/feedbacks/' +feedback._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if(response.ok) {
       dispatch({type: 'DELETE_FEEDBACK', payload: json})
    }
  }
//=========================================================
  const user = JSON.parse(localStorage.getItem('userInfo'));

  /*******************************************************/

  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get(`/api/users/${user._id}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.log(err));
  }, []);
//=============================================

  return (
    <div className="feedback-details">
      <h4>{feedback.gemType}</h4>
      {/* {JSON.stringify(feedbacks)} */}
      {/* <p><strong>User Name: </strong>{userData.firstName}</p> */}
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
      {feedback.reply && (
  <p>
    <strong>Feedback Reply:</strong> {feedback.reply}
  </p>
)}
      {/* <span className="material-symbols-outlined" onClick = {handleClick}>delete</span>
      <span>Reply</span>
      <form onSubmit={(e)=> handleFeedbackReply(e, feedback._id)}>

        <textarea value={feedbackReply} onChange={e => setFeedbackReply(e.target.value)}> </textarea>

        <input type="submit" />

      </form> */}
      {/* <Link to = {"/UpdateFeedback/:_id"}> */}
      {/* <Link to = {`/UpdateFeedback/${feedback._id}`}>
      <span >Update</span>
      </Link> */}


      
    </div>
  )

}

export default FeedbackDetails