// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import TutorDashboard from "./TutorDashboard";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login"); // redirect if not logged in
      return;
    }
    setUser(loggedInUser);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      {user.userType === "student" ? (
        <StudentDashboard user={user} />
      ) : (
        <TutorDashboard user={user} />
      )}
    </div>
  );
}

export default Dashboard;
