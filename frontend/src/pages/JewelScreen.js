import React, { useState, useReducer, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';
import logger from 'use-reducer-logger';
import '../CSS/GemScreen.css';
import Header from '../components/Header';

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
  const [Gem, setGem] = useState('');

  localStorage.setItem('gemCartInfo', JSON.stringify(Gem));


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
  const handleAddToCart = async (itemid) => {
    const data = {
      cartitemid: itemid,
      cartquantity: 1,
      cartuserid: JSON.parse(localStorage.getItem('userInfo'))._id,
    };
    const response = await fetch(`/api/cart/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    // await fetch(`/api/cart/user/${data.cartuserid}`)
    //   .this((res) => res.json())
    //   .this((json) => setCartData(json));
    // setCartData();

    // const temp = await response.json();
    // setCartData([...cartData, temp]);
  };

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    { error }
  ) : (
    <>
      <Header />
      <div>
        <div className="lightBlueBodyBG">
          <div className="whiteBodyBG">
            <div className="content-top-part">
              <div className="img-section-large"></div>
              <div className="btns-description">
                <p className="gem-name">{Jwl.name}</p>
                <p className="gem-price">${Jwl.price}</p>

                <div className="btns">
                  <button
                    onClick={() => handleAddToCart(Jwl._id)}
                    className="btn-add-to-cart"
                  >
                    Add to cart 
                  </button>
                </div>
                <label className="label">Gem Shape</label>
                <select
                  className="input"
                  onChange={(event) => {
                    setGem(event.target.value);
                  }}
                >
                  <option value="">Select a shape</option>
                  <option value="Round">Round</option>
                  <option value="Oval">Oval</option>
                  <option value="Pear">Pear</option>
                  <option value="Marquise">Marquise</option>
                  <option value="Emerald">Emerald</option>
                  <option value="Heart">Heart</option>
                  <option value="Trillion">Trillion</option>
                  <option value="Princess">Princess</option>
                </select>

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
                  <table className="detail-table">
                    <tr>
                      <td className="cl1">Type</td>
                      <td className="cl2">: {Jwl.type}</td>
                    </tr>
                    <tr>
                      <td className="cl1">Gender</td>
                      <td className="cl2">: {Jwl.gender}</td>
                    </tr>

                    {/* <tr>
                    <td className="cl1">Stone</td>
                    <td className="cl2">: {Jwl.gemstone}ct</td>
                  </tr> */}
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
    </>
  );
}

export default JewelScreen;
