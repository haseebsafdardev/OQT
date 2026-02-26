import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Dashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || user.userType !== "Student") navigate("/login");
  }, [navigate]);

  const [student] = useState({
    name: "Ali Khan",
    email: "ali@student.com",
    city: "Karachi",
    profile: null,
    enrolledClasses: [
      { subject: "Tajweed", tutor: "Sara Ahmed", date: "2026-02-09" },
      { subject: "Hifz", tutor: "Sara Ahmed", date: "2026-02-11" },
    ],
    lessonPlans: ["Lesson 1: Nazra", "Lesson 2: Tajweed"],
    schedule: [
      { day: "Tuesday", time: "10:00-11:00" },
      { day: "Thursday", time: "13:00-14:00" },
    ],
  });

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h2 className="logo">Student Panel</h2>

        <ul className="sidebar-menu">
          <li onClick={() => navigate("/student-dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/update-profile")}>Update Profile</li>
          <li onClick={() => navigate("/student-schedule")}>Schedule</li>
          <li onClick={() => navigate("/student-history")}>History</li>
          <li className="logout-link" onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        {/* Top Header */}
        <div className="dashboard-header">
          <div>
            <h2>Welcome back, {student.name}</h2>
            <p className="sub-text">{student.city}</p>
          </div>

          <div className="header-profile">
            <div className="header-user-info">
              <span className="header-name">{student.name}</span>
              <span className="header-role">Student</span>
            </div>
            <img
              src={student.profile || "/default-avatar.png"}
              alt="Profile"
              className="header-avatar"
            />
          </div>
        </div>

        {/* Schedule Card */}
        <div className="card">
          <h3>Weekly Schedule</h3>
          <div className="card-grid">
            {student.schedule.map((s, i) => (
              <div key={i} className="weekly-card">
                <span>{s.day}</span>
                <span>{s.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enrolled Classes */}
        <div className="card">
          <h3>Enrolled Classes</h3>
          {student.enrolledClasses.map((c, i) => (
            <div key={i} className="student-row">
              <div className="student-info">
                <p className="name">{c.subject}</p>
                <p>Tutor: {c.tutor}</p>
                <p>Date: {c.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lesson Plans */}
        <div className="card">
          <h3>Lesson Plans</h3>
          <ul className="lesson-list">
            {student.lessonPlans.map((lp, i) => (
              <li key={i}>{lp}</li>
            ))}
          </ul>
        </div>

      </main>
    </div>
  );
}

export default StudentDashboard;