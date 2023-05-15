import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Header from './components/Header';
import React, {createContext, useState, useContext } from 'react';


// pages & components
import Home from './pages/Home';

//Kalinga
import UserLogin from './pages/UserLogin';
import UserRegistration from './pages/UserRegistration';
import UserProfile from './pages/UserProfile';
import UserProfileUpdate from './pages/UserProfileUpdate';
import AdminUsers from './pages/AdminUsers';
import AdminHome from './pages/AdminHome';
import ResetPassword from './pages/ChangePassword';
import AllUsers from './pages/AllUsers';

//janith
import Gemhome from './pages/Gemhome';
import GemScreen from './pages/GemScreen';

//bimsara
import ReqMain from './pages/ReqMain';
import Reply_userView from './pages/Reply_userView';
import MyReq from './pages/MyReq';
import RequestAdmin from './pages/RequestAdmin';
import ReplyRequest from './pages/ReplyRequest';
import Myreply from './pages/Myreply';
import Reply_adminView from './pages/Reply_adminCheck';

//malika
import FeedbackForm from './pages/FeedbackPage';
import UpdateFeedback from './pages/UpdateFeedback';
import AllFeedbacks from './pages/AllFeedbacks';
import UserFeedbacks from './pages/UserFeedbacks';
import AdminFeedbacks from './pages/AdminFeedbacks';

//Vidxni
import MyPayments from './pages/MyPayments';
import PaymentForm from './components/PaymentForm';
import PaymentUpdate from './components/PaymentUpdate';
import CartPage from './pages/CartPage';

// ruchira
import JewelleryAdminDashboard from './pages/JewelleryAdminDashboard';
import AddJewelleryes from './pages/AddJewelleryes';
import JewelleryDetails from './components/JewelleryDetails';
import UpdateJewellery from './pages/UpdateJewellery';
import JewelleryAdminReport from './pages/JewelleryAdminReport';

//Daham
import JewelhomeMen from './pages/JewelhomeMen';
import JewelScreen from './pages/JewelScreen';
import JewelhomeWomen from './pages/JewelhomeWomen';

//vihangi
import InstallmentPlans from './pages/InstallmentPlans';
import SelectedInstallmentPlan from './pages/SelectedInstallmentPlan';
import AllInstallments from './pages/AllInstallments';
import AdminInstallmentPlans from './pages/AdminInstallmentPlans';
import AdminUpdatePlan from './pages/AdminUpdatePlan';
import MyInstallments from './pages/MyInstallments';

//ammaar
import GemAdminHome from './pages/GemAdminHome';
import AddGem from './pages/AddGem';
import UpdateGems from './pages/UpdateGems';
import AdminPayments from './pages/AdminPayments';
import AdminDelivery from './pages/AdminDelivery';
import GemAdminReports from './pages/GemAdminReports';

export const RecoveryContext = createContext();

function App() {
  const { user } = useAuthContext();

  return (

  
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            {/* kalinga */}
            <Route path="/" element={<Home />} />
            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/login" element={!user ? <UserLogin /> : <Navigate to="/" />} />
            <Route path="/Register" element={!user ? <UserRegistration /> : <Navigate to="/" />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/profile/editProfile/:id" element={<UserProfileUpdate />} />
            <Route path="/profile/resetPassword/:id" element={<ResetPassword />} />
            <Route path="/AllUsers" element={<AllUsers />} />

            {/* janith */}
            <Route path="/gems" element={<Gemhome />}></Route>
            <Route path="/gems/:id" element={<GemScreen />}></Route>
            <Route path="/mycart" element={<CartPage />}></Route>

            {/* bimsara */}
            <Route path="/reqM" element={<ReqMain />}></Route>
            <Route path="/MyReq" element={<MyReq />}></Route>
            <Route path="/reqAd" element={<RequestAdmin />}></Route>
            <Route path="/reqReply/:reqId" element={<ReplyRequest />}></Route>
            <Route path="/Myrep" element={<Myreply />}></Route>
            <Route path="/reply_uv/:reqId" element={<Reply_userView />}></Route>
            <Route path="/reply_av/:reqId" element={<Reply_adminView />}></Route>

            {/* <Route path='/' element={<AdminUsers/>}/> gugyugub*/}

            {/* Malika */}
            <Route path="/feedbacks" element={<AllFeedbacks />} />
            <Route path="/Userfeedbacks" element={<UserFeedbacks />} />
            <Route path="/AdminFeedbacks" element={<AdminFeedbacks />} />
            <Route path="/FeedbackForm/:paymentid" element={<FeedbackForm />} />
            <Route path="/UpdateFeedback/:_id" element={<UpdateFeedback />} />

            {/* vidxni */}
            <Route path="/payments" element={<PaymentForm />} />
            <Route path="/MyPayments" element={<MyPayments />} />
            <Route path="/MyPayments/PaymentUpdate/:id" element={<PaymentUpdate />}/>
            <Route path="/AdminPayments" element={<AdminPayments/>} /> 
            <Route path="/AdminDelivery" element={<AdminDelivery/>}/>

            {/* ruchira */}
            <Route path="/JewelleryAdminDashboard" element={<JewelleryAdminDashboard />} />
            <Route path="/AddJewelleryes" element={<AddJewelleryes />} />

            <Route
              path="/UpdateJewelleryes/:_id"
              element={<UpdateJewellery />}
            />
            <Route 
            path="/JewelleryAdminReport"
            element={<JewelleryAdminReport/>}
            />
            <Route path="/UpdateJewelleryes/:_id" element={<UpdateJewellery />} />

            {/* daham */}
            <Route path="/jwellhomeM" element={<JewelhomeMen />} />
            <Route path="/jwellhomeW" element={<JewelhomeWomen />} />
            <Route path="/jwellscreen/:id" element={<JewelScreen />} />

            {/* ammaar */}
            <Route path="/GemAdminHome" element={<GemAdminHome />} />
            <Route path="/AddGem" element={<AddGem />} />
            <Route path="/UpdateGems/:_id" element={<UpdateGems />} />
            <Route path='/GemAdminReports' element={<GemAdminReports/>}/>

            {/* Vihangi  */}
            <Route path="/InstallmentPlans" element={<InstallmentPlans />} />
            <Route path="/InstallmentPlans/selectedInstallmentPlan/:id" element={<SelectedInstallmentPlan />} />

            {/* admin */}
            <Route path="/AdminInstallmentPlans/AllInstallments" element={<AllInstallments />} />
            <Route path="/AdminInstallmentPlans" element={<AdminInstallmentPlans />} />
            <Route path="/AdminInstallmentPlans/adminUpdatePlan/:id" element={<AdminUpdatePlan />} />
            <Route path="/profile/MyPayments/MyInstallments/:id" element={<MyInstallments />} />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
