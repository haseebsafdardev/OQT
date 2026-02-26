import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import StudentSignup from "./pages/StudentSignup";
import StudentHistory from "./pages/StudentHistory";
import StudentDashboard from "./pages/StudentDashboard";
import StudentSchedule from "./pages/StudentSchedule";


import TutorSignup from "./pages/TutorSignup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import TutorDashboard from "./pages/TutorDashboard";
import TutorSchedule from "./pages/TutorSchedule";
import TutorHistory from "./pages/TutorHistory";
import ResetPassword from "./pages/ResetPassword";
import UpdateProfile from "./pages/UpdateProfile";



import AddChild from "./pages/AddChild";
import GuardianDashboard from "./pages/GuardianDashboard";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup-student" element={<StudentSignup />} />
        <Route path="/signup-tutor" element={<TutorSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/tutor-dashboard" element={<TutorDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-schedule" element={<StudentSchedule />} />
        <Route path="/tutor-schedule" element={<TutorSchedule />} />
        <Route path="/student-history" element={<StudentHistory />} />
        <Route path="/tutor-history" element={<TutorHistory />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/add-child" element={<AddChild />} />
        <Route path="/guardian-dashboard" element={<GuardianDashboard />} />
              
      </Routes>
    </BrowserRouter>
  );
}

export default App;

