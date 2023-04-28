import {useEffect }from 'react'
import { useFeedbacksContext }from '../hooks/useFeedbackContext'

//components
import FeedbackDetailsUsers from '../components/FeedbackDetailsUsers'

const UserFeedbacks = () =>{
  const {feedbacks, dispatch} = useFeedbacksContext()

  useEffect(() =>{
    const fetchFeedbacks = async () => {
      const response = await fetch(`/api/feedbacks/user/${JSON.parse(localStorage.getItem('userInfo'))._id}`)
      const json = await response.json()

      if(response.ok) {

        dispatch({type: 'SET_FEEDBACKS', payload: json})
        
      }
    }

    fetchFeedbacks()
  },[dispatch])

    return (

        <div className="Userfeedbacks">
          <div classname = "feedbacks">
            {feedbacks && feedbacks.map((feedback) =>(
              <FeedbackDetailsUsers key={feedback._id} feedback={feedback} />
            ))}

          </div>
          {/* <FeedbackForm/> */}
          <button onClick= {() => {window.location.href = "./FeedbackForm"}}> Add Feedback</button>
        </div>

        
    )
}
export default  UserFeedbacks 



