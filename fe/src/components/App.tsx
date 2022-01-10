import React from 'react';
import logo from '../assets/logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSignUpPage from '../views/UserSignUpPage';
import ClinicSignUpPage from '../views/ClinicSignUpPage';
import LandingPage from '../views/LandingPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage isDialogOpen={false} />} />
          <Route path="/login" element={<LandingPage isDialogOpen={true} />} />
          <Route path="/user-sign-up" element={<UserSignUpPage />} />
          <Route path="/clinic-sign-up" element={<ClinicSignUpPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
