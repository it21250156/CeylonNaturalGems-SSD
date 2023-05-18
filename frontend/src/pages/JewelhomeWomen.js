import React, { useEffect, useReducer, useState } from 'react';

import logger from 'use-reducer-logger';
// import { useGemsContext } from '../hooks/useGemsContext';
import '../CSS/Gemhome.css';
import Header from '../components/Header';


//components
import JewelCard from '../components/jwellCard';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, Jewel: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Jewelhome = () => {
  // const {gems, dispatch} = useGemsContext()
  const [{ loading, error, Jewel }, dispatch] = useReducer(logger(reducer), {
    Jewel: [],
    loading: true,
    error: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchJewels = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await fetch('/api/jewells/gender/Female');
       //const response = await fetch(`/api/jewells/bygender/Male`);
        const json = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: json });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      
    };
    fetchJewels();
  }, []);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  
  useEffect(() => {
    let results = Jewel.filter((Jwl) =>
      Jwl.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // if (sortBy === 'addedDate') {
    //   results = results.sort(
    //     (a, b) =>
    //       (sortOrder === 'asc' ? 1 : -1) *
    //       (new Date(a.createdAt) - new Date(b.createdAt))
    //   );
    //   // } else if (sortBy === 'quantity') {
    //   //   results = results.sort(
    //   //     (a, b) => (sortOrder === 'asc' ? 1 : -1) * (a.quantity - b.quantity)
    //   //   );
    // } else if (sortBy === 'price') {
    //   results = results.sort(
    //     (a, b) => (sortOrder === 'asc' ? 1 : -1) * (a.price - b.price)
    //   );
    // }

    setSearchResults(results);
  }, [Jewel, searchTerm]);

  const handleSortChange = (event) => {
    const selectedSortBy = event.target.value;

    // if (selectedSortBy === sortBy) {
    //   setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    // } else {
    //   setSortBy(selectedSortBy);
    //   setSortOrder('asc');
    // }
  };


  return (
    <>
    <Header/>
    <div className="gemhome">
      <div className="gems">
        <div className="lightBlueBodyBG">
          <div className="whiteBodyBG">
            <div className="darkBlueTopicBox">
              <h3 className="pageTopic">Women's Jewellery</h3>
            </div>
            
            <div className="gem-search-wrapper">
                <div className="gem-search">
                  <input
                    className="gem-search-input"
                    type="text"
                    placeholder="Search by Jwellery Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                </div>
            {/* {JSON.stringify(Jewel)} */}
            <div className="gem-cards">
            {searchResults.length > 0 ? (
                  searchResults.map((Jwl) => (
                    <JewelCard key={Jwl._id} Jwl={Jwl}/>
                  ))
                ) : (
                  <p>No results found. Please check the gem name.</p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Jewelhome;
