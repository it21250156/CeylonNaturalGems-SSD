import react, { useEffect, useState } from 'react';
import FeedbackForm from '../components/FeedbackForm';
import { useFeedbacksContext } from '../hooks/useFeedbackContext';
import { useNavigate, useParams } from 'react-router-dom';
import StarRating from 'react-star-ratings';
import Header from '../components/Header';
import '../CSS/FeedbackForm.css';

function UpdateFeedback() {
  const { _id } = useParams();
  const { feedbacks, dispatch } = useFeedbacksContext();
  const [feedback, setFeedback] = useState({});

  const [gemType, setGemType] = useState('');
  const [gemQty, setGemQty] = useState('');
  const [fbInfo, setFbInfo] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const nav = useNavigate();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fbInfo) {
      setError(true);
      return;
    }

    const response = await fetch(`/api/feedbacks/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        gemType: gemType,
        gemQty: gemQty,
        fbInfo: fbInfo,
        rating: rating,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    // nav('/feedbacks')
    nav('/UserFeedbacks');
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await fetch(`/api/feedbacks/${_id}`);
      const json = await response.json();

      setFeedback(json);
      console.log(json);

      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }
      if (response.ok) {
        setGemType(json.gemType);
        setGemQty(json.gemQty);
        setFbInfo(json.fbInfo);
        setRating(json.rating);
        setError(null);
        setEmptyFields([]);
        console.log(response);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <>
      <Header />
      <div className="UpdateFeedback">
        {/* {JSON.stringify(feedback)} */}

        <div className="title-box-feedback">
          <p className="title-feedback">Update Feedback</p>
        </div>

        <div className="all-fb-light-blue-bg">
          <form
            className="create"
            onSubmit={handleSubmit}
            enctype="multipart/form-data"
          >
            <label className="label">Gem/Jewellery Name(s):</label>
            <input
              readOnly
              id="input"
              type="text"
              onChange={(e) => setGemType(e.target.value)}
              value={gemType}
              className={emptyFields.includes('gemType') ? 'error' : ''}
            />

            <label className="label">Item Quantity:</label>
            <input
              readOnly
              id="input"
              type="number"
              onChange={(e) => setGemQty(e.target.value)}
              value={gemQty}
              className={emptyFields.includes('gemQty') ? 'error' : ''}
            />

            <label className="label">Type Feedback:</label>

            <textarea
              id="input"
              name="feedbackContent"
              cols="100"
              rows="10"
              onChange={(e) => {
                setFbInfo(e.target.value);
                setError(false);
              }}
              value={fbInfo}
              className={
                emptyFields.includes('fbInfo') || !fbInfo ? 'error' : ''
              }
            ></textarea>
            {!fbInfo && <div className="error">Please provide feedback.</div>}

            <label className="label">Add Star Rating:</label>
            <StarRating
              id="rating"
              name="rating"
              rating={rating}
              starRatedColor="#0a2647"
              starHoverColor="orange"
              starDimension="25px"
              starSpacing="5px"
              changeRating={handleRatingChange}
            />

            {/* <label className="label">Upload Image:</label>
            <input
              type="file"
              name="image"
              accept="image/jpg, image/jpeg, image/png"
            ></input> */}
            <br />
            <br />
            <button className="add-feedbackform-btn" type="submit">
              Update Feedback
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateFeedback;
