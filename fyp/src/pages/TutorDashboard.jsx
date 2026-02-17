import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Dashboard.css";

function TutorDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedIn || loggedIn.userType !== "Tutor") {
      navigate("/login");
    }
  }, [navigate]);

  // Dummy tutor data
  const [tutor, setTutor] = useState({
    name: "Sara Ahmed",
    email: "sara@tutor.com",
    city: "Lahore",
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
      <aside className="dashboard-sidebar">
        <div className="profile-card">
          <div className="profile-pic">{tutor.profile ? <img src={tutor.profile} alt="Profile"/> : "👤"}</div>
          <h3>{tutor.name}</h3>
          <p>{tutor.email}</p>
          <p>{tutor.city}</p>
          <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      <main className="dashboard-main">
        <h2>Welcome, {tutor.name}</h2>

        <div className="dashboard-section">
          <h3>Schedule</h3>
          <div className="card-grid">
            {tutor.schedule.map((s, i) => (
              <div key={i} className="card">
                <p><strong>{s.day}</strong></p>
                <p>{s.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Classes Held</h3>
          <div className="card-grid">
            {tutor.classesHeld.map((c, i) => (
              <div key={i} className="card">
                <p><strong>{c.subject}</strong></p>
                <p>Date: {c.date}</p>
                <p>Student: {c.student}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Lesson Plans</h3>
          <ul>
            {tutor.lessonPlans.map((lp, i) => <li key={i}>{lp}</li>)}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default TutorDashboard;
