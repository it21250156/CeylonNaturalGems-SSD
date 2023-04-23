import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Header from './components/Header';

// pages & components
import Home from './pages/Home';

//Kalinga
import UserLogin from './pages/UserLogin';
import UserRegistration from './pages/UserRegistration';
import UserProfile from './pages/UserProfile';
import UserProfileUpdate from './pages/UserProfileUpdate';
import AdminUsers from './pages/AdminUsers';

//janith
import Gemhome from './pages/Gemhome';
import GemScreen from './pages/GemScreen';


//bimsara
import ReqMain from './pages/ReqMain';
import MyReq from './pages/MyReq';
import RequestAdmin from './pages/RequestAdmin';
import ReplyRequest from './pages/ReplyRequest';

//malika
import FeedbackForm from './pages/FeedbackPage';
import UpdateFeedback from './pages/UpdateFeedback';
import AllFeedbacks from './pages/AllFeedbacks'
import UserFeedbacks from './pages/UserFeedbacks'

//Vidxni
import MyPayments from './pages/MyPayments';
import PaymentForm from './components/PaymentForm';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <UserLogin /> : <Navigate to="/" />}
            />
            <Route
              path="/Register"
              element={!user ? <UserRegistration /> : <Navigate to="/" />}
            />
            <Route path="/gems" element={<Gemhome />}></Route>
            <Route path="/gems/:id" element={<GemScreen />}></Route>
            <Route path="/reqM" element={<ReqMain />}></Route>
            <Route path="/MyReq" element={<MyReq />}></Route>
            <Route path="/reqAd" element={<RequestAdmin />}></Route>
            
            {/* <Route 
                path="/signup" 
                element={!user ? <Signup /> : <Navigate to="/" />} 
              /> */}

            <Route path="/profile/:id" element={<UserProfile />} />
            <Route
              path="/profile/editProfile/:id"
              element={<UserProfileUpdate />}
            />
            {/* <Route path='/' element={<AdminUsers/>}/> gugyugub*/}
            <Route path ="/feedbacks" element={<AllFeedbacks/>}/> 
            <Route path ='/FeedbackForm' element ={<FeedbackForm/>}/> 
            <Route path ='/UpdateFeedback/:_id' element ={<UpdateFeedback/>}/> 
            {/* <Route path ='/UserFeedbacks/:_id' element ={<UserFeedbacks/>}/>  */}


            {/* vidxni */}
            <Route path="/payments" element={<PaymentForm/>} />
            <Route path="/MyPayments" element={<MyPayments/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
