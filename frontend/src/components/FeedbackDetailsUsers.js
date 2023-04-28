import { useFeedbacksContext } from '../hooks/useFeedbackContext';
import { Link } from 'react-router-dom';
import StarRating from 'react-star-ratings';
import '../CSS/UserFeedbacks.css';

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useEffect, useState } from 'react';

const FeedbackDetailsUsers = ({ feedback }) => {
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

  return (
    <div className="feedback-details-users">
      <p className="feedback-name">{feedback.gemType}</p>
      <div className="cols">
        <div className="feedback-col-1">
          <div className="img-section"></div>
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
            Gem Quantity:
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
            onClick={handleClick}
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
    </div>
  );
};

export default FeedbackDetailsUsers;
