import {useEffect }from 'react'
import { useFeedbacksContext }from '../hooks/useFeedbackContext'

//components
import FeedbackDetailsUsers from '../components/FeedbackDetailsUsers'
import { Link } from 'react-router-dom'

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
          <Link to = {'/FeedbackForm/644673394e7e2b940937df7b'}>
          <button> Add Feedback</button>
          </Link>
        </div>

        
    )
}
export default  UserFeedbacks 



