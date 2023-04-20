import React, { useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';
// import { useGemsContext } from '../hooks/useGemsContext';
import '../CSS/Gemhome.css';

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

  return (
    <div className="gemhome">
      <div className="gems">
        <div className="lightBlueBodyBG">
          <div className="whiteBodyBG">
            <div className="darkBlueTopicBox">
              <h3 className="pageTopic">Gemstones</h3>
            </div>
            <div className="gem-cards">
              {gems &&
                gems.map((gem) => <GemCard key={gem._id} gem={gem}></GemCard>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gemhome;
