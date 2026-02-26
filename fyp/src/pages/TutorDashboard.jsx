import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Dashboard.css";

function TutorDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || user.userType !== "Tutor") navigate("/login");
  }, [navigate]);

  const [tutor] = useState({
    name: "Shafeeq Gondal",
    email: "shafeeq@gmail.com",
    city: "Islamabad",
    profile: null,
    lessonPlans: ["Lesson 1: Nazra", "Lesson 2: Tajweed", "Lesson 3: Hifz"],
    classesHeld: [
      { subject: "Tajweed", date: "2026-02-09", student: "Ali Khan" },
      { subject: "Hifz", date: "2026-02-11", student: "Ali Khan" },
    ],
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
        <h2 className="logo">Tutor Panel</h2>

        <ul className="sidebar-menu">
          <li onClick={() => navigate("/tutor-dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/tutor-schedule")}>Schedule</li>
          <li onClick={() => navigate("/tutor-history")}>History</li>
          <li onClick={() => navigate("/update-profile")}>Profile</li>
        </ul>
      </aside>

      {/* Main */}
      <main className="dashboard-main">

        {/* Header */}
        <div className="dashboard-header">
          <h2>Welcome, {tutor.name}</h2>

          <div className="header-profile">
            <img
              src={tutor.profile || "/default-avatar.png"}
              alt="Profile"
              className="header-avatar"
            />
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Schedule */}
        <div className="card">
          <h3>Schedule</h3>
          {tutor.schedule.map((s, i) => (
            <div key={i} className="weekly-card">
              <span>{s.day}</span>
              <span>{s.time}</span>
            </div>
          ))}
        </div>

        {/* Classes */}
        <div className="card">
          <h3>Classes Held</h3>
          {tutor.classesHeld.map((c, i) => (
            <div key={i} className="student-row">
              <div className="student-info">
                <p className="name">{c.student}</p>
                <p>{c.subject}</p>
                <p>{c.date}</p>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}

export default TutorDashboard;