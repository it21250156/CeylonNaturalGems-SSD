import '../CSS/AppBW.css';
import {useState, useEffect} from "react";
import Axios from "axios";
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from '../components/Header';
import { Link, useParams } from 'react-router-dom';

const validationSchema = yup.object().shape({
  // requestID: yup.number().required("Request ID is required"),
  FirstName: yup.string().required("First Name is required"),
  LastName: yup.string().required("Last Name is required"),
  Email: yup.string().email("Invalid email").required("Email is required"),
  PhoneNo: yup.number().required("Phone No is required"),
  GemType: yup.string().required("Gem Type is required"),
  GemColor: yup.string().required("Gem Color is required"),
  GemShape: yup.string().required("Gem Shape is required"),
  Description: yup.string().required("Description is required"),
  Weight: yup.number().required("Weight is required"),
  Quantity: yup.number().required("Quantity is required"),
});



function ReqMain() {
  const [listOfRequests, setListOfRequests] = useState([]);
  // const [requestID, setRequestID] = useState(0);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNo, setPhoneNo] = useState(0);
  const [GemType, setGemType] = useState("");
  const [GemColor, setGemColor] = useState("");
  const [GemShape, setGemShape] = useState("");
  const [Description, setDescription] = useState("");
  const [Weight, setWeight] = useState(0);
  const [Quantity, setQuantity] = useState(0);
  

  useEffect(() => {
    Axios.get("/getUsers").then((response) => {
      setListOfRequests(response.data);
    });
  }, []);


  const createRequest = (data) => {
    Axios.post("/createUser", data).then((response) => {
      alert("Request Added!");
    });
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  return (
    <div className="App">
      {/* <Header></Header> */}
      <div className="requestDisplay">
        <div className='headding'>
          REQUEST GEMS
        </div>
        <div className='requestM'>

        <form onSubmit={handleSubmit(createRequest)}>
            <div className='requantent'>
            {/* <p>Request ID</p>
              <input className='tb' type="number"  placeholder="Request ID..." {...register("requestID")} onChange={(event) =>{
                setRequestID(event.target.value);
              }} />
              {errors.requestID && <p className='validation'>{errors.requestID.message}</p>} */}

              <p>Gem Type</p>
              <input className='tb' type="text" placeholder="GemType..." {...register("GemType")} onChange={(event) =>{
                setGemType(event.target.value);
              }}/>
              {errors.GemType && <p className='validation'>{errors.GemType.message}</p>}

              <p>Gem Colour</p>
              <input className='tb' type="text"  placeholder="GemColor..." {...register("GemColor")} onChange={(event) =>{
                setGemColor(event.target.value);
              }}/>
              {errors.GemColor && <p className='validation'>{errors.GemColor.message}</p>}

              <p>Gem Shape</p>
              <input className='tb' type="text"  placeholder="GemShape..." {...register("GemShape")} onChange={(event) =>{
                setGemShape(event.target.value);
              }}/>
              {errors.GemShape && <p className='validation'>{errors.GemShape.message}</p>}

              <p>Description</p>
              <input className='tb' type="textbox"  placeholder="Description..." {...register("Description")} onChange={(event) =>{
                setDescription(event.target.value);
              }}/>
              {errors.Description && <p className='validation'>{errors.Description.message}</p>}

              <p>Weight</p>
              <input className='tb' type="number"  placeholder="Weight..." {...register("Weight")} onChange={(event) =>{
                setWeight(event.target.value);
              }}/>
              {errors.Weight && <p className='validation'>{errors.Weight.message}</p>}

              <p>Quantity</p>
              <input className='tb' type="number"  placeholder="Quantity..." {...register("Quantity")} onChange={(event) =>{
                setQuantity(event.target.value);
              }}/>
              {errors.Quantity && <p className='validation'>{errors.Quantity.message}</p>}

              <p></p>
              <hr class='hr1'></hr>
              <div>
                  <h1 className='head'>Your Information</h1>
                  <p>First Name</p>
                  <input className='tb' type="text"  placeholder="FirstName..." {...register("FirstName")} onChange={(event) =>{
                    setFirstName(event.target.value);
                  }}/>
                  {errors.FirstName && <p className='validation'>{errors.FirstName.message}</p>}

                  <p>Last Name</p>
                  <input className='tb' type="text"  placeholder="LastName..." {...register("LastName")} onChange={(event) =>{
                    setLastName(event.target.value);
                  }}/>
                  {errors.LastName && <p className='validation'>{errors.LastName.message}</p>}

                  <p>Email</p>
                  <input className='tb' type="text"  placeholder="Email..." {...register("Email")} onChange={(event) =>{
                    setEmail(event.target.value);
                  }}/>
                  {errors.Email && <p className='validation'>{errors.Email.message}</p>}

                  <p>Phone No</p>
                  <input className='tb' type="text"  placeholder="PhoneNo..." {...register("PhoneNo")} onChange={(event) =>{
                    setPhoneNo(event.target.value);
                  }}/>
                  {errors.PhoneNo && <p className='validation'>{errors.PhoneNo.message}</p>}

                  <button className='reqbtn' onClick={createRequest}>Request</button>
              </div>
              
            </div>
          </form>
            </div>

          {/* <button className='viewreqbt' onClick={() => {window.location.href = "./MyReq"}}>View My Requests</button> */}
          <Link to={'/MyReq'}>
              <button className="req-btn">View My Requests</button>
            </Link>

          
          
          
        </div>
        <button  onClick={() => {window.location.href = "./reqAd"}}>All Requests</button>
    </div>
  );
}


export default ReqMain;