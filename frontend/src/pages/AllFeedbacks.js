import { useEffect } from 'react';
import { useFeedbacksContext } from '../hooks/useFeedbackContext';
import '../CSS/feedback.css';

//components
import FeedbackDetails from '../components/FeedbackDetails';
import FeedbackForm from '../components/FeedbackForm';
import Header from '../components/Header';

const AllFeedbacks = () => {
  const { feedbacks, dispatch } = useFeedbacksContext();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await fetch('/api/feedbacks');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_FEEDBACKS', payload: json });
      }
    };

    fetchFeedbacks();
  }, [dispatch]);

  return (
    <>
      <Header />
      <div>
        <div className="Allfeedbacks">
          <div className="title-box-feedback">
            <p className="title-feedback">Customer Feedbacks</p>
          </div>
          <div className="light-blue-bg">
            <div classname="feedback-card">
              {feedbacks &&
                feedbacks.map((feedback) => (
                  <FeedbackDetails key={feedback._id} feedback={feedback} />
                ))}
            </div>
          </div>
          {/* <FeedbackForm/> */}
          {/* <button onClick= {() => {window.location.href = "./FeedbackForm"}}> Add Feedback</button> */}
        </div>
      </div>
    </>
  );
};
export default AllFeedbacks;
