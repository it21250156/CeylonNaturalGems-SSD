import { useEffect, useState } from 'react';
import { useFeedbacksContext } from '../hooks/useFeedbackContext';
import StarRating from 'react-star-ratings';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import '../CSS/FeedbackForm.css';
import { useAuthContext } from '../hooks/useAuthContext';
import { id } from 'date-fns/locale';

const FeedbackForm = () => {
  const { paymentid } = useParams();
  const { dispatch } = useFeedbacksContext();
  const [payment, setPayment] = useState('');
  const { user, cartData } = useAuthContext();
  const [gems, setGems] = useState([])
  const [jewellery, setJewelleries] = useState([])
  const [fbInfo, setFbInfo] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);


  const [feedCart, setFeedCart] = useState('');
  const [orders, setOrders] = useState('');

  const nav = useNavigate();

  useEffect(() => {
    console.log("check123")

    const fetchPayment = async () => {

      try {
        console.log("check1")
        const response = await fetch('/api/payments/' + paymentid);
        const json = await response.json();
        setPayment(json);

        if (json?.orderID) {
          console.log("got order ID", json?.orderID)
          const itemList = json?.orderID

          const gemPromises = itemList.map(item => {
            console.log("gem check " + item);
            return axios
              .get('http://localhost:4000/api/gems&jewelleries/gems/' + item)
              .then(resp => {
                console.log("gem response " + item, " ", resp.status);
                if (resp.status === 200) {
                  console.log("got gem ", resp.data);
                  return resp.data;
                }
              })
              .catch(err => {
                console.log(err);
                return null; // Return null if there was an error fetching the gem
              });
          });



          const jewelPromises = itemList.map(item => {
            console.log("jewel check " + item);
            return axios
              .get(`http://localhost:4000/api/jewelleryes/` + item)
              .then(res => {
                if (res.status === 200) {
                  console.log("got jewel ", res.data);
                  return res.data;
                }
              })
              .catch(err => {
                console.log(err);
                return null; // Return null if there was an error fetching the jewel
              });
          });



          Promise.all([...gemPromises, ...jewelPromises])
            .then(results => {
              // Handle the fetched gems and jewels
              const gems = results.filter(result => result !== null);
              setGems(gems);
              console.log(gems);
              // Call setGems function or update the desired state/variable here
            })
            .catch(err => {
              console.log(err);
            });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPayment()

  }, [])

  const [gemType, setGemType] = useState("Loading..");

  const [gemQty, setGemQty] = useState("Loading..");


  useEffect(() => {
    if (gems) {
      setGemType(() => {
        let str = ''

        gems.map(gem => {

          str += gem.name + ", "

        })

        return str.substring(0, str.length - 2)
      })

      setGemQty(() => {
        return gems?.length

      })
    }
  }, [gems])

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

  return (
    <>
      <Header />
      <div className="title-box-feedback">
        <p className="title-feedback">Add a new Feedback</p>
      </div>
      <div className="light-blue-bg">
        <form
          className="create"
          onSubmit={handleSubmit}
          enctype="multipart/form-data"
        >
         
          <label className="label"> Gem/Jewellery Name(s)</label>
          <input
            readOnly
            id="input"
            type="text"
            onChange={(e) => setGemType(e.target.value)}
            value={gemType
            }
            className={emptyFields?.find((f) => f === 'gemType') ? 'error' : ''}
          />

          <label className="label"> Item Quantity</label>
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

          <label className="label"> Upload Image</label>
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
