import react, { useEffect } from 'react'
import FeedbackForm from '../components/FeedbackForm'
import { useFeedbacksContext }from '../hooks/useFeedbackContext'




function FeedbackPage () {

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
        <div className= "FeedbackPage">
 
  <FeedbackForm/>
  
</div>

    )


}

export default FeedbackPage

