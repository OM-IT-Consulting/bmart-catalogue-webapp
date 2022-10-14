import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignUp from './features/userlogin/SignUp';
import SignIn from './features/userlogin/SignIn';
import DashBoard from './features/samplepages/dashboard/DashBoard';
import Checkout from './features/samplepages/checkout';
import Application from './features/samplepages/application';
import FileUpload from './features/samplepages/fileupload';
import PymtIntegration from './features/samplepages/pymtintegration';
import MFIntegration from './features/samplepages/mfintegration';
import ForgotPassword from './features/userlogin/ForgotPassword';
import ChangePassword from './features/userlogin/ChangePassword';
import MerchantApproval from './features/bmart/userapproval/MerchantApproval';


const App = () => {
  return(
    <Router basename="/app/remote/catalogue">
      <div>
        <Routes>
        <Route
            path="/"
            caseSensitive={false}
            element={<Navigate to={<SignIn/>}/>}
          />
        <Route
            path="/signin"
            caseSensitive={false}
            element={<SignIn/>}
          />
          <Route
            path="/signup"
            caseSensitive={false}
            element={<SignUp/>}
          />
          <Route
            path="/forgotpassword"
            caseSensitive={false}
            element={<ForgotPassword/>}
          />
          <Route
            path="/changepassword"
            caseSensitive={false}
            element={<ChangePassword/>}
          />
          <Route
            path="/dashboard"
            caseSensitive={false}
            element={<DashBoard/>}
          />
          <Route
            path="/applicationpage"
            caseSensitive={false}
            element={<Application/>}
          />
          <Route
            path="/pymtintegration"
            caseSensitive={false}
            element={<PymtIntegration/>}
          />
           <Route
            path="/mfintegration"
            caseSensitive={false}
            element={<MFIntegration/>}
          />
          <Route
            path="/checkoutform"
            caseSensitive={false}
            element={<Checkout/>}
          />
          <Route
            path="/fileupload"
            caseSensitive={false}
            element={<FileUpload/>}
          />
          <Route
            path="/bmart/userapproval/merchantapproval"
            caseSensitive={false}
            element={<MerchantApproval/>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

