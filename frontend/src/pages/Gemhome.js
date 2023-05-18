import React, { useEffect, useReducer, useState } from 'react';
import logger from 'use-reducer-logger';
// import { useGemsContext } from '../hooks/useGemsContext';
import '../CSS/Gemhome.css';
import Header from '../components/Header';

//components
import GemCard from '../components/GemCard';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, gems: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Gemhome = () => {
  // const {gems, dispatch} = useGemsContext()
  const [{ loading, error, gems }, dispatch] = useReducer(logger(reducer), {
    gems: [],
    loading: true,
    error: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchGems = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await fetch('/api/gems&jewelleries/gems');
        const json = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: json });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchGems();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    let results = gems.filter((gem) =>
      gem.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'addedDate') {
      results = results.sort(
        (a, b) =>
          (sortOrder === 'asc' ? 1 : -1) *
          (new Date(a.createdAt) - new Date(b.createdAt))
      );
      // } else if (sortBy === 'quantity') {
      //   results = results.sort(
      //     (a, b) => (sortOrder === 'asc' ? 1 : -1) * (a.quantity - b.quantity)
      //   );
    } else if (sortBy === 'price') {
      results = results.sort(
        (a, b) => (sortOrder === 'asc' ? 1 : -1) * (a.price - b.price)
      );
    }

    setSearchResults(results);
  }, [gems, searchTerm, sortBy, sortOrder]);

  const handleSortChange = (event) => {
    const selectedSortBy = event.target.value;

    if (selectedSortBy === sortBy) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(selectedSortBy);
      setSortOrder('asc');
    }
  };

  return (
    <>
      <Header />
      <div className="gemhome">
        <div className="gems">
          <div className="lightBlueBodyBG">
            <div className="whiteBodyBG">
              <div className="darkBlueTopicBox">
                <h3 className="pageTopic">Gemstones</h3>
              </div>

              <div className="gem-search-wrapper">
                <div className="gem-search">
                  <input
                    className="gem-search-input"
                    type="text"
                    placeholder="Search by Gem Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <div className="gem-sort">
                <label htmlFor="sort-select" className="gem-sort-lable">
                  Sort by:{' '}
                </label>
                <select
                  className="sort-select"
                  id="sort-select"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="">--Select--</option>
                  <option value="date">Added Date</option>
                  {/* <option value="quantity">Quantity</option> */}
                  <option value="price">Price</option>
                </select>
              </div>

              <div className="gem-cards">
                {searchResults.length > 0 ? (
                  searchResults.map((gem) => (
                    <GemCard gem={gem} key={gem._id} />
                  ))
                ) : (
                  <p>No results found. Please check the gem name.</p>
                )}

                {/* {gems &&
                  gems.map((gem) => (
                    <GemCard key={gem._id} gem={gem}></GemCard>
                  ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gemhome;
