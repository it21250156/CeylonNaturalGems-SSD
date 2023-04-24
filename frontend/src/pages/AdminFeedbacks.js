import {useEffect }from 'react'
import { useFeedbacksContext }from '../hooks/useFeedbackContext'

//components

import FeedbackDetailsAdmin from '../components/FeedbackDetailsAdmin'

const AdminFeedbacks = () =>{
  const {feedbacks, dispatch} = useFeedbacksContext()

  useEffect(() =>{
    const fetchFeedbacks = async () => {
      const response = await fetch('/api/feedbacks')
      const json = await response.json()

      if(response.ok) {

        dispatch({type: 'SET_FEEDBACKS', payload: json})
        
      }
    }

    fetchFeedbacks()
  },[dispatch])

    return (

        <div className="Adminfeedbacks">
          <div classname = "feedbacks">
            {feedbacks && feedbacks.map((feedback) =>(
              <FeedbackDetailsAdmin key={feedback._id} feedback={feedback} />
            ))}

          </div>
          {/* <FeedbackForm/> */}
          <button onClick= {() => {window.location.href = "./FeedbackForm"}}> Add Feedback</button>
        </div>

        
    )
}
export default  AdminFeedbacks 
