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
    <FeedbacksContextProvider>
    <JewelContextProvider>
    {/* <RouterProvider router={router}/> */}
      <App />
    </JewelContextProvider>
    </FeedbacksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);