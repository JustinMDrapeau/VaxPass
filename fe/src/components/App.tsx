import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClinicSignUpPage from '../views/ClinicSignUpPage';
import LandingPage from '../views/LandingPage';
import ClinicMainPage from "../views/ClinicMainPage";
import './App.css';
import PatientPage from '../views/PatientPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage isDialogOpen={false} />} />
          <Route path="/clinic-sign-up" element={<ClinicSignUpPage />} />
          <Route path="/patient-page/:patientInfo" element={<PatientPage />} />
          <Route path="/clinic-main-page" element={<ClinicMainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
