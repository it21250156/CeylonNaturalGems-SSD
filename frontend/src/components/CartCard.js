import { Link } from 'react-router-dom';
import '../CSS/CartCard.css';
import { useAuthContext } from '../hooks/useAuthContext';

function CartCard({ cartid, gem, jewellery }) {
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
      {gem !== null &&
        <div className="cartcard-content">
          <div className="cartimg-section"></div>
          <div className="name-price">
            <p className="cartcard-name">{gem?.name}</p>
            <p className="cartcard-price">${gem?.price}</p>
          </div>
          <div className="update-section">
            <div>
              {/* {cartData.find((item) => item._id === cartid)?.cartquantity > 1 && ( */}
              <button
                className="decrease-btn"
                onClick={() => handleChangeQuantityCart(cartid, 'DECREASE')}
                disabled={
                  !(
                    cartData.find((item) => item._id === cartid)?.cartquantity > 1
                  )
                }
              >
                -
              </button>
              {/* )} */}
            </div>
            <div className="quantity">
              {cartData.find((item) => item._id === cartid)?.cartquantity}
            </div>
            <div>
              <button
                className="increase-btn"
                onClick={() => handleChangeQuantityCart(cartid, 'INCREASE')}
                disabled={
                  !(
                    cartData.find((item) => item._id === cartid)?.cartquantity <
                    gem?.quantity
                  )
                }
              >
                +
              </button>
            </div>
          </div>
          <div className="btn-delete">
            <button class="btn1" onClick={() => handleCartRemove(cartid)}>
              <p class="paragraph"> Remove </p>
              <span class="icon-wrapper">
                <svg
                  class="icon"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      }
      {jewellery !== null && gem === null &&
        <div className="cartcard-content">
          {/* {JSON.stringify(jewellery) || "none"} */}
          <div className="cartimg-section"></div>
          <div className="name-price">
            <p className="cartcard-name">{jewellery?.name}</p>
            <p className="cartcard-price">${jewellery?.price}</p>
            <p className="cartcard-name">{jewellery?.gemstone}</p>
          </div>
          <div className="update-section">

          </div>
          <div className="btn-delete">
            <button class="btn1" onClick={() => handleCartRemove(cartid)}>
              <p class="paragraph"> Remove </p>
              <span class="icon-wrapper">
                <svg
                  class="icon"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      }
    </div>
  );
}

export default CartCard;
