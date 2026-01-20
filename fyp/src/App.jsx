import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import StudentSignup from "./pages/StudentSignup";
import TutorSignup from "./pages/TutorSignup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import TutorDashboard from "./pages/TutorDashboard";
import StudentDashboard from "./pages/StudentDashboard";


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


       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
