import { useNavigate } from "react-router-dom";
import "../style/BottomNav.css";

function BottomNav({ userType }) {
  const navigate = useNavigate();

  return (
    <nav className="bottom-nav">
      <button onClick={() => navigate(userType === "Tutor" ? "/tutor-dashboard" : "/student-dashboard")}>
        Home
      </button>

      <button onClick={() => navigate(userType === "Tutor" ? "/tutor-schedule" : "/student-schedule")}>
        Schedule
      </button>

      <button onClick={() => navigate(userType === "Tutor" ? "/tutor-dashboard" : "/student-dashboard")}>
        Manage
      </button>

      {userType === "Student" && (
        <button onClick={() => navigate("/tutor-dashboard")}>Tutors</button>
      )}

      <button onClick={() => navigate(userType === "Tutor" ? "/tutor-history" : "/student-history")}>
        History
      </button>
    </nav>
  );
}

export default BottomNav;
