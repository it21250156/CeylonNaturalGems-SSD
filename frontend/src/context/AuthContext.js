import { createContext, useReducer, useEffect, useState } from 'react';
import { json } from 'react-router-dom';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    case 'DELETE_USER':
      return { user: state.user.filter((u) => u._id !== action.payload._id) };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

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

    const temp = await response.json();
    setCartData([...cartData, temp]);
  };

  const handleChangeQuantityCart = async (cartid, mode) => {
    const item = await fetch(`/api/cart/${cartid}`);
    const upditem = {
      _id: item._id,
      cartquantity:
        mode === 'INCREASE' ? item.cartquantity++ : item.cartquantity--,
    };
    console.log(item);
    console.log(upditem);
    const response = await fetch(`/api/cart/${cartid}`, {
      method: 'PATCH',
      body: JSON.stringify(upditem),
      headers: { 'Content-Type': 'application/json' },
    });
    const temp = await response.json();
    const updcart = cartData.filter((item) => item._id !== cartid);
    setCartData([...updcart, temp]);
  };

  const handleCartRemove = async (cartid) => {
    const response = await fetch(`/api/cart/${cartid}`, {
      method: 'DELETE',
    });

    const json = await response.json();
    console.log(json);
    setCartData(cartData.filter((item) => item._id !== json._id));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      fetch(`/api/cart/user/${user._id}`)
        .then((res) => res.json())
        .then((json) => setCartData(json));
    }
  }, []);

  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        cartData,
        setCartData,
        handleAddToCart,
        handleCartRemove,
        handleChangeQuantityCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
