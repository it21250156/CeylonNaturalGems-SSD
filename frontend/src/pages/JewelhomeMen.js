import React, { useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';
// import { useGemsContext } from '../hooks/useGemsContext';
import '../CSS/Gemhome.css';

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

  useEffect(() => {
    const fetchJewels = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await fetch('/api/jewelleryes');
        const json = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: json });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchJewels();
  }, []);

  return (
    <div className="gemhome">
      <div className="gems">
        <div className="lightBlueBodyBG">
          <div className="whiteBodyBG">
            <div className="darkBlueTopicBox">
              <h3 className="pageTopic">Men's Jewellery</h3>
            </div>
            <div className="gem-cards">
              {Jewel &&
                Jewel.map((Jwl) => <JewelCard key={Jwl._id} Jwl={Jwl}></JewelCard>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jewelhome;
