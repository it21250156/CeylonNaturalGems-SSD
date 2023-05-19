import { useFeedbacksContext } from '../hooks/useFeedbackContext';
import { Link } from 'react-router-dom';
import StarRating from 'react-star-ratings';
import '../CSS/UserFeedbacks.css';
import Swal from 'sweetalert2';

//DeleteCon

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
      Swal.fire('Feedback Deleted', '', 'success');
    }
  };

  const handleConfirm = () => {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this Feedback?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleClick();
      }
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Deletion Cancelled',
      text: 'Feedback deletion has been cancelled',
      icon: 'info',
    });
  };

  return (
    <div className="feedback-details-users">
      <p className="feedback-name">{feedback.gemType}</p>
      <div className="cols">
        <div className="my-feedback-col-1">
          <div>
            {feedback.feedback_img && (
              <img
                className="my-feedback-img"
                src={feedback.feedback_img}
                alt="Feedback"
              />
            )}
          </div>
        </div>
        <div className="my-feedback-col-2">
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
            onClick={handleConfirm}
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
