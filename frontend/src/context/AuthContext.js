import axios from 'axios';
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

  // const handleChangeQuantityCart = (cartid, mode) => {
  //   axios.get(`http://localhost:4000/api/cart/${cartid}`).then(async (item) => {
  //     const upditem = {
  //       _id: item.data[0]._id,
  //       cartquantity:
  //         mode === 'INCREASE'
  //           ? item.data[0].cartquantity + 1
  //           : item.data[0].cartquantity - 1,
  //     };
  //     console.log(cartid);
  //     console.log(item.data[0]);
  //     console.log(upditem);

  //     axios
  //       .get(`/api/cart/${cartid}`, {
  //         method: 'PATCH',
  //         body: JSON.stringify(upditem),
  //         headers: { 'Content-Type': 'application/json' },
  //       })
  //       .then((newcart) => {
  //         const updcart = cartData.filter((item) => item._id !== cartid);
  //         console.log(newcart.data[0]);
  //         setCartData([...updcart, newcart.data[0]]);
  //       });
  //   });
  // };

  const handleChangeQuantityCart = async (cartid, mode) => {
    const item = await axios.get(`http://localhost:4000/api/cart/${cartid}`);

    const upditem = {
      _id: item.data[0]._id,

      cartquantity:
        mode === 'INCREASE'
          ? item.data[0].cartquantity + 1
          : item.data[0].cartquantity - 1,
    };

    console.log(cartid);

    console.log(item.data[0]);

    console.log(upditem);

    const newcart = await axios.patch(`/api/cart/${cartid}`, upditem);

    const updcart = cartData.filter((item) => item._id !== cartid);

    console.log(newcart);

    setCartData(
      cartData.map((item) =>
        item._id === cartid
          ? { ...item, cartquantity: newcart.data.cartquantity }
          : item
      )
    );
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
