import React, { useReducer, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import logger from 'use-reducer-logger';
import '../CSS/GemScreen.css';

export const JwelReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        Jwl: action.payload,
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

function JewelScreen() {
  const params = useParams();
  const { id } = params;
  const [{ loading, error, Jwl }, dispatch] = useReducer(logger(JwelReducer), {
    Jwl: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchJewels = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await fetch(`/api/jewelleryes/${id}`);
        const json = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: json });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchJewels();
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
              <p className="gem-name">{Jwl.name}</p>
              <p className="gem-price">${Jwl.price}</p>

              <div className="btns">
           
                  <button className="btn-add-to-cart">Add to cart</button>
            
                
         
              </div>

              <div className="gem-desc">
                <p>{Jwl.description}</p>
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
                    <td className="cl2">: {Jwl.type}</td>
                  </tr>
                  <tr>
                    <td className="cl1">Gender</td>
                    <td className="cl2">: {Jwl.gender}</td>
                  </tr>
               
                  <tr>
                    <td className="cl1">Stone</td>
                    <td className="cl2">: {Jwl.gemstone}ct</td>
                  </tr>
                  <tr>
                    <td className="cl1">MetalType</td>
                    <td className="cl2">: {Jwl.metal}ct</td>
                  </tr>
                </table>
              </center>
            </div>
          </div>
          <h1>New Arrivals</h1>

          <div className="card">
            <div className="card-content">
              <span className="img-section"></span>
              <p className="card-name">{Jwl.name}</p>
              <p className="card-price">${Jwl.price}</p>
            </div>
            <Link to={`/jewells/${Jwl._id}`}>
              <button className="card-button">Read More...</button>
            </Link>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default JewelScreen;
