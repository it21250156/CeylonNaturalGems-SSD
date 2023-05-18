import { Link } from "react-router-dom";
import "../CSS/CartCard.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";

function CartCard({ cartid, gem, jewellery }) {
  const { cartData, handleCartRemove, handleChangeQuantityCart } =
    useAuthContext();

  const [isAtItemMax, setIsAtItemMax] = useState(false);
  const [isAtItemMin, setIsAtItemMin] = useState(false);

  useEffect(() => {
    setIsAtItemMax(
      !(
        cartData.find((item) => item._id === cartid)?.cartquantity <
        gem?.quantity
      )
    );
    setIsAtItemMin(
      !(cartData.find((item) => item._id === cartid)?.cartquantity > 1)
    );
  }, [cartData, gem, cartid]);

  const jewelWithGem = JSON.parse(localStorage.getItem("gemCartInfo"));

  const confirmCartRemove = (cartid) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (confirmed) {
      // Call the remove item function
      handleCartRemove(cartid);
    }
  };

  return (
    <div className="cartcard">
      {gem !== null && (
        <div className="cartcard-content">
          <div className="cartimg-section">
            <div className="gem-image-container">
              {gem.gem_img && (
                <img src={gem.gem_img} alt="Gem" className="gem-card__image" />
              )}
            </div>
          </div>
          <div className="name-price">
            <p className="cartcard-name">{gem?.name}</p>
            <p className="cartcard-price">${gem?.price}</p>
          </div>
          <div className="update-section">
            <div>
              <button
                className="decrease-btn"
                onClick={() => handleChangeQuantityCart(cartid, "DECREASE")}
                disabled={isAtItemMin}
              >
                -
              </button>
            </div>
            <div className="quantity">
              {cartData.find((item) => item._id === cartid)?.cartquantity}
            </div>
            <div>
              <button
                className="increase-btn"
                onClick={() => handleChangeQuantityCart(cartid, "INCREASE")}
                disabled={isAtItemMax}
              >
                +
              </button>
            </div>
          </div>
          <div className="btn-delete">
            <button className="btn1" onClick={() => confirmCartRemove(cartid)}>
              <p className="paragraph"> Remove </p>
              <span className="icon-wrapper">
                <svg
                  className="icon"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </button>
            {isAtItemMax && <p>Reached max limit</p>}
          </div>
        </div>
      )}
      {jewellery !== null && gem === null && (
        <div className="cartcard-content">
          <div className="cartimg-section"></div>
          <div className="name-price">
            <p className="cartcard-name">{jewellery?.name}</p>
            <p className="cartcard-price">${jewellery?.price}</p>
            <p className="cartcard-name">{jewelWithGem}</p>
          </div>
          <div>
            {jewellery.jewellery_img && (
              <img
                src={jewellery.jewellery_img}
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  marginBottom: "10px",
                }}
              />
            )}
          </div>
          <div className="update-section"></div>
          <div className="btn-delete">
            <button className="btn1" onClick={() => confirmCartRemove(cartid)}>
              <p className="paragraph"> Remove </p>
              <span className="icon-wrapper">
                <svg
                  className="icon"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartCard;
