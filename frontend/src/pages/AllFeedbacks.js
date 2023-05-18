import React, { useEffect, useState } from 'react';
import { useFeedbacksContext } from '../hooks/useFeedbackContext';
import FeedbackDetails from '../components/FeedbackDetails';
import FeedbackForm from '../components/FeedbackForm';
import Header from '../components/Header';
import '../CSS/feedback.css';
import '../CSS/FeedbackDetails.css';

const AllFeedbacks = () => {
  const { feedbacks, dispatch } = useFeedbacksContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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

  useEffect(() => {
    if (feedbacks) {
      const filteredResults = feedbacks.filter((feedback) =>
        feedback.gemType.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);

      if (filteredResults.length === 0) {
        setErrorMessage(
          'No Feedbacks found with the specified Gem or Jewellery name.'
        );
      } else {
        setErrorMessage('');
      }
    }
  }, [feedbacks, searchTerm]);

  return (
    <>
      <Header />
      <div className="Allfeedbacks">
        <div className="title-box-feedback">
          <p className="title-feedback">Customer Feedbacks</p>
        </div>
        <div className="all-fb-light-blue-bg">
          <div className="search-bar">
            <input
              className="feedback-search-input"
              type="text"
              placeholder="Search By Gem Or Jewellery Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            {errorMessage ? (
              <p className="error">{errorMessage}</p>
            ) : (
              searchResults.map((feedback) => (
                <FeedbackDetails key={feedback._id} feedback={feedback} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllFeedbacks;
