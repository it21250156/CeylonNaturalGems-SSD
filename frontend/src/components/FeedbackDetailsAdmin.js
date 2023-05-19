import { useFeedbacksContext } from '../hooks/useFeedbackContext';
import { Link } from 'react-router-dom';
import StarRating from 'react-star-ratings';
import Swal from 'sweetalert2';

//DeleteCon

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useEffect, useState } from 'react';

const FeedbackDetailsAdmin = ({ feedback }) => {
  const [feedbackReply, setFeedbackReply] = useState('');

  useEffect(() => {
    setFeedbackReply(feedback?.reply || '');
  }, []);

  const { dispatch, feedbacks } = useFeedbacksContext();

  const handleFeedbackReply = async (e, fid) => {
    e.preventDefault();

    const response = await fetch('/api/feedbacks/' + feedback._id, {
      method: 'PATCH',
      body: JSON.stringify({
        reply: feedbackReply,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    console.log(json);

    if (response.ok) {
      dispatch({ type: 'UPDATE_FEEDBACK', payload: json });
    }
  };

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

  return (
    <div className="feedback-card">
      <h4 className="feedback-name">{feedback.gemType}</h4>
      <div className="cols">
        <div className="all-feedback-col-1">
          {feedback.feedback_img && (
            <img
              style={{
                maxWidth: '200px',
                maxHeight: '200px',
                marginBottom: '10px',
              }}
              src={feedback.feedback_img}
              alt="Feedback"
            />
          )}
        </div>
        <div className="all-feedback-col-2">
          <p className="g-quantity-tag">
            <strong>Item Quantity: </strong>
            {feedback.gemQty}
          </p>
          <p className="feedback-description">
            <strong>Feedback: </strong>
            {feedback.fbInfo}
          </p>
          {/* <p><strong>Rating: </strong>{feedback.rating}</p> */}
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
        </div>
        <div>
          <span
            className="material-symbols-outlined"
            id="delete"
            onClick={handleConfirm}
          >
            delete
          </span>
        </div>
      </div>

      <p className="time-stamp-feedback">
        {formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}
      </p>

      <span className="reply-fb-">Type a Reply</span>
      <form onSubmit={(e) => handleFeedbackReply(e, feedback._id)}>
        <textarea
          value={feedbackReply}
          onChange={(e) => setFeedbackReply(e.target.value)}
        >
          {' '}
        </textarea>
        <center>
          <input className="fbreply-submit" type="submit" />
        </center>
      </form>
    </div>
  );
};

export default FeedbackDetailsAdmin;
