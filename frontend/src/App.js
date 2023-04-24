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
import Myreply from './pages/Myreply';

//malika
import FeedbackForm from './pages/FeedbackPage';
import UpdateFeedback from './pages/UpdateFeedback';
import AllFeedbacks from './pages/AllFeedbacks';

//Vidxni
import MyPayments from './pages/MyPayments';
import PaymentForm from './components/PaymentForm';

import CartPage from './pages/CartPage';

// ruchira
import JewelleryAdminDashboard from './pages/JewelleryAdminDashboard';
import AddJewelleryes from './pages/AddJewelleryes';
import JewelleryDetails from './components/JewelleryDetails';
import UpdateJewellery from './pages/UpdateJewellery'

//Daham
import Jewelhome from './pages/Jewelhome';
import JewelScreen from './pages/JewelScreen';


//vihangi
import InstallmentPlans from './pages/InstallmentPlans'
import SelectedInstallmentPlan from './pages/SelectedInstallmentPlan'
import AllInstallments from './pages/AllInstallments'
import AdminInstallmentPlans from './pages/AdminInstallmentPlans'
import AdminUpdatePlan from './pages/AdminUpdatePlan';
import MyInstallments from './pages/MyInstallments';

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

            {/* janith */}
            <Route path="/gems" element={<Gemhome />}></Route>
            <Route path="/gems/:id" element={<GemScreen />}></Route>
            <Route path="/mycart" element={<CartPage />}></Route>

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

            {/* vidxni */}
            <Route path="/payments" element={<PaymentForm />} />
            <Route path="/MyPayments" element={<MyPayments />} />

            {/* ruchira */}
            <Route path='/JewelleryAdminDashboard' element={<JewelleryAdminDashboard/>}/>

            <Route path='/AddJewelleryes' element={<AddJewelleryes/>}/>

            <Route path='/UpdateJewelleryes/:_id' element={<UpdateJewellery/>}/>            

            {/* Vihangi  */}
            <Route path = "/InstallmentPlans" element={ <InstallmentPlans />} />
            <Route path = "/InstallmentPlans/selectedInstallmentPlan/:id" element={ <SelectedInstallmentPlan />} /> 

            {/* daham */}
            <Route path="/jwellhome" element={<Jewelhome/>}/>
            <Route path="/jwellscreen/:id" element={<JewelScreen/>}/>

            {/* admin */}
            <Route path = "/AllInstallments" element={ <AllInstallments />} />
            
            <Route path = "/AdminInstallmentPlans" element={ <AdminInstallmentPlans />} />  
            <Route path= "/AdminInstallmentPlans/adminUpdatePlan/:id" element={ <AdminUpdatePlan /> } />
            <Route path= "/profile/MyPayments/MyInstallments/:id" element={ <MyInstallments /> } />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
