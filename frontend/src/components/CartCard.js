import { Link } from 'react-router-dom';
import '../CSS/CartCard.css';
import { useAuthContext } from '../hooks/useAuthContext';

function CartCard({ cartid, gem }) {
  const { cartData, handleCartRemove, handleChangeQuantityCart } =
    useAuthContext();

  // const handleCartRemove = async () => {
  //   const response = await fetch(`/api/cart/${cartid}`, {
  //     method: 'DELETE',
  //   });

  //   const json = await response.json();
  // }
  //   const { gem } = gem;
  return (
    <div className="cartcard">
      <div className="cartcard-content">
        <span className="cartimg-section"></span>
        <p className="cartcard-name">{gem.name}</p>
        <p className="cartcard-price">${gem.price}</p>
      </div>
      <div className="update-section">
        <div className="decrease-btn">
          {/* {cartData.find((item) => item._id === cartid)?.cartquantity > 1 && ( */}
          <button
            onClick={() => handleChangeQuantityCart(cartid, 'DECREASE')}
            disabled={
              !(cartData.find((item) => item._id === cartid)?.cartquantity > 1)
            }
          >
            -
          </button>
          {/* )} */}
        </div>
        <div className="quantity">
          {cartData.find((item) => item._id === cartid)?.cartquantity}
        </div>
        <div className="increase-btn">
          <button
            onClick={() => handleChangeQuantityCart(cartid, 'INCREASE')}
            disabled={
              !(
                cartData.find((item) => item._id === cartid)?.cartquantity <
                gem.quantity
              )
            }
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => handleCartRemove(cartid)}
        className="cartcard-button"
      >
        Remove
      </button>
    </div>
  );
}

export default CartCard;
