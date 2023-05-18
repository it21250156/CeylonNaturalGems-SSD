import '../CSS/AppBW.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Header from '../components/Header';
import { Link, useParams } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import Swal from 'sweetalert2';

const validationSchema = yup.object().shape({
  // requestID: yup.number().required("Request ID is required"),
  FirstName: yup.string().required('First Name is required'),
  LastName: yup.string().required('Last Name is required'),
  Email: yup.string().email('Invalid email').required('Email is required'),
  PhoneNo: yup.string().required('Phone No is required'),
  GemType: yup.string().required('Gem Type is required'),
  GemColor: yup.string().required('Gem Color is required'),
  GemShape: yup.string().required('Gem Shape is required'),
  Description: yup.string().required('Description is required'),
  Weight: yup.string().required('Weight is required'),
  Quantity: yup.string().required('Quantity is required'),
});

function ReqMain() {
  const [listOfRequests, setListOfRequests] = useState([]);
  // const [requestID, setRequestID] = useState(0);
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [PhoneNo, setPhoneNo] = useState(0);
  const [GemType, setGemType] = useState('');
  const [GemColor, setGemColor] = useState('');
  const [GemShape, setGemShape] = useState('');
  const [Description, setDescription] = useState('');
  const [Weight, setWeight] = useState(0);
  const [Quantity, setQuantity] = useState(0);
  

  useEffect(() => {
    Axios.get('/getUsers').then((response) => {
      setListOfRequests(response.data);
    });
  }, []);



  const createRequest = (data) => {
    const udata={...data, user: JSON.parse(localStorage.getItem('userInfo'))?._id || null,}

    console.log(udata)

    Axios.post('/createUser', udata).then((response) => {
      Swal.fire('Request Added')
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <>
      <Header />
      <div className="App">
        <div className="requestDisplay">
          <div className="darkBlueTopicBoxReq">
            <h1 className="pageTopicReq">REQUEST GEMS</h1>
          </div>
          <div className="lightBlueBodyBGUserprofile">
            <form onSubmit={handleSubmit(createRequest)}>
              <div className="requantent">
                {/* <p>Request ID</p>
              <input className='tb' type="number"  placeholder="Request ID..." {...register("requestID")} onChange={(event) =>{
                setRequestID(event.target.value);
              }} />
              {errors.requestID && <p className='validation'>{errors.requestID.message}</p>} */}

                {/* column 1 */}
                <div className="column-1">
                  <p className="column-title">Your Preferences</p>
                  {/* type */}
                  <label className="label">Gem Type</label>
                  <input
                    className="input"
                    autoComplete="on"
                    type="text"
                    {...register('GemType')}
                    onChange={(event) => {
                      setGemType(event.target.value);
                    }}
                  />
                  {errors.GemType && (
                    <p className="validation">{errors.GemType.message}</p>
                  )}

                  {/* colour */}
                  <label className="label">Gem Colour</label>
                  <input
                    className="input"
                    autoComplete="on"
                    type="text"
                    {...register('GemColor')}
                    onChange={(event) => {
                      setGemColor(event.target.value);
                    }}
                  />
                  {errors.GemColor && (
                    <p className="validation">{errors.GemColor.message}</p>
                  )}

                  {/* shape */}
                  <label className="label">Gem Shape</label>
                  <select
                    className="input"
                    {...register('GemShape')}
                    onChange={(event) => {
                      setGemShape(event.target.value);
                    }}
                  >
                    <option value="">Select a shape</option>
                    <option value="Round">Round</option>
                    <option value="Oval">Oval</option>
                    <option value="Pear">Pear</option>
                    <option value="Marquise">Marquise</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Heart">Heart</option>
                    <option value="Trillion">Trillion</option>
                    <option value="Princess">Princess</option>
                  </select>
                  {errors.GemShape && (
                    <p className="validation">{errors.GemShape.message}</p>
                  )}

                  {/* description */}
                  <label className="label">Description</label>
                  <input
                    className="input"
                    autoComplete="on"
                    type="textbox"
                    {...register('Description')}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                  {errors.Description && (
                    <p className="validation">{errors.Description.message}</p>
                  )}

                  {/* weight */}
                  <label className="label">Weight(Carat)</label>
                  <input
                    className="input"
                    autoComplete="on"
                    type="number"
                    {...register('Weight')}
                    onChange={(event) => {
                      setWeight(event.target.value);
                    }}
                  />
                  {errors.Weight && (
                    <p className="validation">{errors.Weight.message}</p>
                  )}

                  {/* quantity */}
                  <label className="label">Quantity</label>
                  <input
                    className="input"
                    autoComplete="on"
                    type="number"
                    {...register('Quantity')}
                    onChange={(event) => {
                      setQuantity(event.target.value);
                    }}
                  />
                  {errors.Quantity && (
                    <p className="validation">{errors.Quantity.message}</p>
                  )}
                </div>

                <div className="column-2">
                  <p className="column-title">Personal Information</p>
                  {/* first name */}
                  <label className="label">First Name</label>
                  <input
                    className="input"
                    autoComplete="on"
                    type="text"
                    {...register('FirstName')}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                  />
                  {errors.FirstName && (
                    <p className="validation">{errors.FirstName.message}</p>
                  )}

                  {/* last name */}
                  <label className="label">Last Name</label>
                  <input
                    className="input"
                    autoComplete="on"
                    type="text"
                    {...register('LastName')}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                  />
                  {errors.LastName && (
                    <p className="validation">{errors.LastName.message}</p>
                  )}

                  {/* email */}
                  <label className="label">Email</label>
                  <input
                    className="input"
                    autoComplete="on"
                    type="text"
                    {...register('Email')}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                  {errors.Email && (
                    <p className="validation">{errors.Email.message}</p>
                  )}

                  <label className="label">Phone No</label>
                  <input
                    className="input"
                    autoComplete="on"
                    type="text"
                    {...register('PhoneNo')}
                    onChange={(event) => {
                      setPhoneNo(event.target.value);
                    }}
                  />
                  {errors.PhoneNo && (
                    <p className="validation">{errors.PhoneNo.message}</p>
                  )}
                </div>
              </div>
              <button className="reqbtn" onClick={createRequest}>
                Submit Request
              </button>
            </form>
          </div>

          {/* <button className='viewreqbt' onClick={() => {window.location.href = "./MyReq"}}>View My Requests</button> */}
          <Link to={'/MyReq'}>
            <button className="req-btn">View My Requests</button>
          </Link>
        </div>
        {/* <button
          onClick={() => {
            window.location.href = './reqAd';
          }}
        >
          All Requests
        </button> */}
        {/* <button
          onClick={() => {
            window.location.href = './reply_uv';
          }}
        >
          Replies
        </button> */}
      </div>
    </>
  );
}

export default ReqMain;
