import React, { useReducer, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import logger from 'use-reducer-logger';
import '../CSS/GemScreen.css';
import { useAuthContext } from '../hooks/useAuthContext';

import Header from '../components/Header';

import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const { user, cartData, setCartData, handleAddToCart } = useAuthContext();
  const params = useParams();
  const { id } = params;
  const [{ loading, error, gem }, dispatch] = useReducer(logger(gemsReducer), {
    gem: [],
    loading: true,
    error: '',
  });
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleRequestGems = () => {
    if (user) {
      // User is logged in, proceed with the request
      navigate('/reqM');
    } else {
      // User is not logged in, show the login popup
      setShowLoginPopup(true);
    }
  };

  // const haddleNavigateToInstallment = () => {
  //       if(!user){
  //         navigate('#') ;
  //       }else if(user){
  //         navigate('/InstallmentPlans');
  //       }
  // }

  useEffect(() => {
    const fetchGems = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const response = await fetch(`/api/gems&jewelleries/gems/${id}`);
        const json = await response.json();

        localStorage.setItem('gemInfo', JSON.stringify(json));

        dispatch({ type: 'FETCH_SUCCESS', payload: json });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchGems();
  }, [id]);

  // const handleAddToCart = async (itemid) => {
  //   const data = {
  //     cartitemid: itemid,
  //     cartquantity: 1,
  //     cartuserid: JSON.parse(localStorage.getItem('userInfo'))._id,
  //   };
  //   const response = await fetch(`/api/cart/`, {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //   await fetch(`/api/cart/user/${data.cartuserid}`)
  //     .this((res) => res.json())
  //     .this((json) => setCartData(json));
  //   // setCartData();
  // };

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
              <div className="img-section-large">
                <div className="gem-image-container">
                  {gem.gem_img && (
                    <img
                      src={gem.gem_img}
                      alt="Gem"
                      className="gem-desc-image"
                    />
                  )}
                </div>
              </div>
              <div className="btns-description">
                <p className="gem-name">{gem.name}</p>
                <p className="gem-price">${gem.price}</p>

                <div className="btns">
                  <button
                    onClick={() => handleAddToCart(gem._id)}
                    className="btn-add-to-cart"
                  >
                    Add to cart
                  </button>
                  <button
                    //onClick={() => haddleNavigateToInstallment}
                    onClick={() => navigate(`/InstallmentPlans`)}
                    className="btn-pay-in-installments"
                  >
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
                  <table className="detail-table">
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
              <button className="req-btn" onClick={handleRequestGems}>
                Request Gems
              </button>
            </div>

            {showLoginPopup && (
              <div className="login-popup">
                <p><strong>Please login first !</strong></p>
                <button className='logincheckbtn' onClick={() => setShowLoginPopup(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default GemScreen;
