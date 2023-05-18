import { useEffect, useState } from 'react';
import { useFeedbacksContext } from '../hooks/useFeedbackContext';
import StarRating from 'react-star-ratings';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

import '../CSS/FeedbackForm.css';
import { useAuthContext } from '../hooks/useAuthContext';

const FeedbackForm = () => {
  const { _id } = useParams();
  const { dispatch } = useFeedbacksContext();

  const { cartData } = useAuthContext();
  const [gems, setGems] = useState([])
  const [jewellery, setJewelleries] = useState([])

  useEffect(() => {
    const fetchGems = async () => {
      try {
        const response = await fetch('/api/gems&jewelleries/gems');
        const json = await response.json();
        setGems(json);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGems();

    const fetchJewelleries = async () => {
      try {
        const response = await fetch(`/api/jewelleryes`);
        const json = await response.json();
        setJewelleries(json);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJewelleries();

  }, [])

  const [payment, setPayment] = useState('');
  const [orders, setOrders] = useState('');
  const [gemType, setGemType] = useState(() => {
    let gemTypeString = ""
    return cartData?.map(cartItem => {
      gems.find(gem => gem._id == cartItem.cartitemid)

    })
    return gemTypeString
  });

  const [gemQty, setGemQty] = useState(() => {
    
  });
  const [fbInfo, setFbInfo] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    setGemType(() => {
      let str = ''
      cartData?.map(cartItem => {
        gems.find(gem => {
          if (gem._id === cartItem.cartitemid) {
            str += cartItem.cartquantity + "x "+ gem.name + ", " 
          }
        })
        jewellery.find(gem => {
          if (gem._id === cartItem.cartitemid) {
            str += cartItem.cartquantity + "x "+ gem.name + ", " 
          }
        })
      })
      return str.substring(0,str.length-2)
    })
    setGemQty (() =>{
      let sum = 0
    cartData.map(cartItem => sum += cartItem?.cartquantity || 0)
    return sum
    })
  })

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedback = {
      gemType,
      gemQty,
      fbInfo,
      rating,
      user: JSON.parse(localStorage.getItem('userInfo'))?._id || null,
    };

    const response = await fetch('/api/feedbacks', {
      method: 'POST',
      body: JSON.stringify(feedback),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setGemType('');
      setGemQty('');
      setFbInfo('');
      setRating(0);
      setError(null);
      setEmptyFields([]);
      console.log('new feedback added', json);
      console.log(response);
      dispatch({ type: 'CREATE_FEEDBACK', payload: json });

      nav('/Userfeedbacks');
    }
  };
  useEffect(() => {
    const getPayments = async () => {
      try {
        const paym = await axios.get(
          `http://localhost:4000/api/payments/${_id}`
        );
        setPayment(paym);

        const ord = await payment.data.orderId.map((order) => {
          axios
            .get(`http://localhost:4000/api/cart/${_id}`)

            .then((result) => {
              setOrders([...orders, result.data]);
            });
        });

        setOrders(ord);
      } catch (e) {
        console.log('e', e);
      }
    };
    getPayments();
  }, []);

  return (
    <>
      <Header />
      <div className="title-box-feedback">
        <p className="title-feedback">Add a new Feedback</p>
      </div>
      <div className="light-blue-bg">
        {JSON.stringify(cartData[0])}
        {JSON.stringify(gems[0])}
        {JSON.stringify(jewellery[0])}
        <form
          className="create"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
          {/* {JSON.stringify(payment.data)} */}
          <label className="label"> Gem/Jewellery Name</label>
          <input
            readOnly
            id="input"
            type="text"
            onChange={(e) => setGemType(e.target.value)}
            value={gemType
              // cartData?.map(cartItem => {
              //   gems.find(gem => {
              //     if (gem._id === cartItem.cartitemid) {
              //       return gem?.name
              //     }
              //   })
              // })
            }
            className={emptyFields?.find((f) => f === 'gemType') ? 'error' : ''}
          />
          {/* {JSON.stringify(orders)} */}

          <label className="label"> Gem Quantity</label>
          <input
            readOnly
            id="input"
            type="number"
            onChange={(e) => setGemQty(e.target.value)}
            value={gemQty}
            className={emptyFields?.find((f) => f === 'gemQty') ? 'error' : ''}
          />

          <label className="label"> Type Feedback</label>

          <textarea
            id="input"
            name="feedbackContent"
            cols="100"
            rows="10"
            onChange={(e) => setFbInfo(e.target.value)}
            value={fbInfo}
            className={emptyFields?.find((f) => f === 'fbInfo') ? 'error' : ''}
          ></textarea>

          <label className="label"> Add Star Rating</label>
          <StarRating
            id="rating"
            name="rating"
            rating={rating}
            starRatedColor="#0a2647"
            starHoverColor="orange"
            starDimension="25px"
            starSpacing="5px"
            changeRating={handleRatingChange}
          />

          <label className="label"> Upload Images</label>
          <input
            type="file"
            name="image"
            accept="image/jpg, image/jpeg, image/png"
          ></input>

          <button type="submit" className="add-feedbackform-btn">
            Add Feedback
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </>
  );
};

export default FeedbackForm;
