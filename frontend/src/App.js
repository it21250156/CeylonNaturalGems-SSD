import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Header from './components/Header';

// pages & components
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserRegistration from './pages/UserRegistration';
import UserProfile from './pages/UserProfile';
import UserProfileUpdate from './pages/UserProfileUpdate';
import AdminUsers from './pages/AdminUsers';

//jannith
import Gemhome from './pages/Gemhome';
import GemScreen from './pages/GemScreen';


//bimsara
import ReqMain from './pages/ReqMain';
import MyReq from './pages/MyReq';
import RequestAdmin from './pages/RequestAdmin';
import ReplyRequest from './pages/ReplyRequest';
import Myreply from './pages/Myreply';

//malika
import FeedbackForm from './pages/FeedbackPage';
import UpdateFeedback from './pages/UpdateFeedback';
import AllFeedbacks from './pages/AllFeedbacks'

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
            <Route path="/reqReply" element={<ReplyRequest />}></Route>
            <Route path="/Myrep" element={<Myreply />}></Route>
            
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
