import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
// import MyReq from './pages/MyReq';
// import RequestAdmin from './pages/RequestAdmin';
// import ReplyRequest from './pages/ReplyRequest';
// import ReqMain from './pages/ReqMain';
import { FeedbacksContextProvider } from './context/FeedbackContext';

import { JewelContextProvider } from './context/JewelPageContext'; 

import { JewelleryesContextProvider} from './context/JewelleryContext'

import { GemsContextProvider } from './context/GemContext';

import { PlanContextProvider} from './context/PlansContext'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
//   },

//   {
//     path: "myreq",
//     element: <MyReq/>,
//   },
//   {
//     path: "reqAd",
//     element: <RequestAdmin/>,
//   },
//   {
//     path: "reqRp",
//     element: <ReplyRequest/>,
//   },
//   {
//     path: "reqM",
//     element: <ReqMain/>,
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <GemsContextProvider>
    <FeedbacksContextProvider>
    <JewelleryesContextProvider>
    <JewelContextProvider>
    <PlanContextProvider>
        
    {/* <RouterProvider router={router}/> */}
      <App />
      
    </PlanContextProvider>
    </JewelContextProvider>
    </JewelleryesContextProvider>
    </FeedbacksContextProvider>
    </GemsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);