import { useFeedbacksContext } from '../hooks/useFeedbackContext';
import { Link } from 'react-router-dom';
import StarRating from 'react-star-ratings';
import '../CSS/UserFeedbacks.css';

//DeleteCon
import ConfirmationModal from './ConfirmationModal';

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useEffect, useState } from 'react';

const FeedbackDetailsUsers = ({ feedback }) => {

  const [showModal, setShowModal] = useState(false);

  const { feedbacks, dispatch } = useFeedbacksContext();

  const handleClick = async () => {
    const response = await fetch('/api/feedbacks/' + feedback._id, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_FEEDBACK', payload: json });
    }
  };

  const handleConfirm = () => {
    setShowModal(false);
    handleClick();
  };

  const handleCancel = () => {
    setShowModal(false);
  };


  return (
    <div className="feedback-details-users">
      <p className="feedback-name">{feedback.gemType}</p>
      <div className="cols">
        <div className="feedback-col-1">
          <div className="img-section">
          {feedback.feedback_img && (
            <img
              src={feedback.feedback_img}
              alt="Feedback"
              style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '10px' }}
            />
          )}
          </div>
        </div>
        <div className="feedback-col-2">
          <p className="feedback-description">{feedback.fbInfo}</p>
          <StarRating
            readOnly
            id="rating"
            name="rating"
            rating={Number(feedback.rating)}
            starRatedColor="#0a2647"
            starHoverColor="orange"
            starDimension="25px"
            starSpacing="5px"
          />
          <p className="g-quantity-tag">
            Item Quantity:
            {feedback.gemQty}
          </p>
        </div>
        <div className="feedback-col-3">
          <Link to={`/UpdateFeedback/${feedback._id}`}>
            <span className="material-symbols-outlined" id="edit">
              edit
            </span>
          </Link>
          <span
            className="material-symbols-outlined"
            id="delete"
            onClick={() => setShowModal(true)}

          >
            delete
          </span>

          {/* <Link to = {"/UpdateFeedback/:_id"}> */}
        </div>
      </div>
      <p className="time-stamp-feedback">
        {formatDistanceToNow(new Date(feedback.createdAt), {
          addSuffix: true,
        })}
      </p>

      {/* {JSON.stringify(feedbacks)} */}

      {/* <p><strong>Rating: </strong>{feedback.rating}</p> */}

      {feedback.reply && (
        <p>
          <strong>Feedback Reply:</strong> {feedback.reply}
        </p>
      )}
      {showModal && (
      <ConfirmationModal
        message="Are you sure you want to delete this feedback?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    )}
    </div>
  );
};

export default FeedbackDetailsUsers;
