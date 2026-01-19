import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import StudentSignup from "./pages/StudentSignup";
import TutorSignup from "./pages/TutorSignup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup-student" element={<StudentSignup />} />
        <Route path="/signup-tutor" element={<TutorSignup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
