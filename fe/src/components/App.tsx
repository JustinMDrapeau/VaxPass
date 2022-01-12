import React from 'react';
import logo from '../assets/logo.svg';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSignUpPage from '../views/UserSignUpPage';
import ClinicSignUpPage from '../views/ClinicSignUpPage';
import LandingPage from '../views/LandingPage';
import './App.css';
import PatientPage from '../views/PatientPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage isDialogOpen={false} />} />
          <Route path="/user-sign-up" element={<UserSignUpPage />} />
          <Route path="/clinic-sign-up" element={<ClinicSignUpPage />} />
          <Route path="/patient-page" element={<PatientPage/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
