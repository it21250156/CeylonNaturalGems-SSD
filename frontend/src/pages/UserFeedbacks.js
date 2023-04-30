import { useEffect } from 'react';
import { useFeedbacksContext } from '../hooks/useFeedbackContext';
import '../CSS/feedback.css';
import Header from '../components/Header'

//components
import FeedbackDetailsUsers from '../components/FeedbackDetailsUsers'
import { Link } from 'react-router-dom'
import Header from '../components/Header';

const UserFeedbacks = () => {
  const { feedbacks, dispatch } = useFeedbacksContext();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await fetch(
        `/api/feedbacks/user/${
          JSON.parse(localStorage.getItem('userInfo'))._id
        }`
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_FEEDBACKS', payload: json });
      }
    };

    fetchFeedbacks();
  }, [dispatch]);

  return (
    <>
      <Header>
      <div className="Userfeedbacks">
        <div className="title-box-feedback">
          <h1 className="title-feedback">My Feedbacks</h1>
        </div>
        <div className="light-blue-bg">
          <div className="top-btn">
            {/* <FeedbackForm/> */}

            <button
              className="add-feedback-btn"
              onClick={() => {
                window.location.href = './FeedbackForm';
              }}
            >
              {' '}
              Add a new Feedback
            </button>
          </div>

          <div classname="feedbacks">
            {feedbacks &&
              feedbacks.map((feedback) => (
                <FeedbackDetailsUsers key={feedback._id} feedback={feedback} />
              ))}
          </div>
          {/* <FeedbackForm/> */}
          <Link to = {'/FeedbackForm/644673394e7e2b940937df7b'}>
          <button> Add Feedback</button>
          </Link>
        </div>
      </div>
      </Header>
    </>
  );
};
export default UserFeedbacks;
