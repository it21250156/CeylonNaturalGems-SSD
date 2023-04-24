import React from 'react';
import { useNavigate } from "react-router-dom"

const CartTotal = ({ gems, cartData, Jwl }) => {

  const navigate = useNavigate()

  const cal = () => {
    let sum = 0;
    cartData.map(
      (cartIns) =>
        (sum +=
          cartIns.cartquantity *
          (gems.find((gem) => gem._id === cartIns.cartitemid)?.price || 0))
    );
    // setTotal(sum);
    return sum;
  };
  return (
    <div className="total">
      <p>Total amount : {gems && cartData && cal()}</p>

      <button onClick={() => { navigate ('/payments')}}>PROCEED TO CHECKOUT</button>
    </div>
  );
};

export default CartTotal;
