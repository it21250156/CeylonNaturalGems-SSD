import React from 'react';

const CartTotal = ({ gems, cartData, Jwl }) => {
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
    </div>
  );
};

export default CartTotal;
