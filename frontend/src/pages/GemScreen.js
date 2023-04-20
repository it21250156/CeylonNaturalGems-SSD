import React, { useReducer, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import logger from 'use-reducer-logger';
import '../CSS/GemScreen.css';

export const gemsReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        gem: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

function GemScreen() {
  const params = useParams();
  const { id } = params;
  const [{ loading, error, gem }, dispatch] = useReducer(logger(gemsReducer), {
    gem: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchGems = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await fetch(`/api/gems&jewelleries/gems/${id}`);
        const json = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: json });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchGems();
  }, [id]);
  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    { error }
  ) : (
    <div>
      <div className="lightBlueBodyBG">
        <div className="whiteBodyBG">
          <div className="content-top-part">
            <div className="img-section-large"></div>
            <div className="btns-description">
              <p className="gem-name">{gem.name}</p>
              <p className="gem-price">${gem.price}</p>

              <div className="btns">
                <button className="btn-add-to-cart">Add to cart</button>
                <button className="btn-pay-in-installments">
                  Pay in Installments
                </button>
              </div>

              <div className="gem-desc">
                <p>{gem.description}</p>
              </div>
            </div>
          </div>
          <div className="content-middle-part">
            <center>
              <p className="details-topic">Details</p>
              <hr className="detail-hr"></hr>
            </center>
            <div className="details-part">
              <center>
                {' '}
                <table>
                  <tr>
                    <td className="cl1">Type</td>
                    <td className="cl2">: {gem.type}</td>
                  </tr>
                  <tr>
                    <td className="cl1">Colour</td>
                    <td className="cl2">: {gem.color}</td>
                  </tr>
                  <tr>
                    <td className="cl1">Shape</td>
                    <td className="cl2">: {gem.shape}</td>
                  </tr>
                  <tr>
                    <td className="cl1">Weight</td>
                    <td className="cl2">: {gem.size}ct</td>
                  </tr>
                </table>
              </center>
            </div>
          </div>
          <div className="req-box">
            <p className="req-txt-1">Can't find something you like?</p>
            <p className="req-txt-2">Let us help you</p>
            <Link to={'/reqM'}>
              <button className="req-btn">Request Gems</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GemScreen;
