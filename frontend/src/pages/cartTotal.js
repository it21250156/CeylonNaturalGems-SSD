import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/cartTotal.css';

const CartTotal = ({ gems, cartData, jewelleries }) => {
  const navigate = useNavigate();

  const cal = () => {
    let sum = 0;
    cartData.map(
      (cartIns) => (
      sum +=          
          cartIns.cartquantity *
          (gems.find((gem) => gem._id === cartIns.cartitemid)?.price || jewelleries?.find(jwl => jwl._id === cartIns.cartitemid)?.price || 0))
    );
    // setTotal(sum);
  
    localStorage.setItem('TamountInfo', sum);

    return sum;
  };
  return (
    <div className="total">
      <div className="tot-content">
        <p className="title">Total Amount</p>

        <p className="amount">${gems && cartData && cal()}</p>

        <button
          className="checkout-btn"
          onClick={() => {
            navigate('/payments');
          }}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartTotal;
