import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication Provider
import { AuthProvider } from "./context/Auth.jsx";
// Splash Screen
import Welcome from "./pages/Welcome";
// Student Panel
import StudentSignup from "./pages/Student/StudentSignup";
import StudentDashboard from "./pages/Student/StudentDashboard.jsx";

// Tutor Panel
import TutorSignup from "./pages/Tutor/TutorSignup";
import TutorDashboard from "./pages/Tutor/TutorDashboard.jsx";
// Authentication
import Login from './pages/Authentication/Login.jsx'

// Class 
import Class from "./pages/Class/Class.jsx";
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />


          {/* Authentication */}
          <Route path="/login" element={<Login />} />


          {/* Student Panel */}
          <Route path="/signup-student" element={<StudentSignup />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />



          {/* Tutor Panel */}
          <Route path="/signup-tutor" element={<TutorSignup />} />
          <Route path="/tutor-dashboard" element={<TutorDashboard />} />
          <Route path="/class/:classID" element={<Class />} />



        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;

