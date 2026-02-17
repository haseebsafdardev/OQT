import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Dashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  // ✅ Check if user is logged in & student
  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedIn || loggedIn.userType !== "Student") {
      navigate("/login");
    }
  }, [navigate]);

  // Dummy student data
  const [student, setStudent] = useState({
    name: "Ali Khan",
    email: "ali@student.com",
    city: "Karachi",
    profile: null,
    lessonPlans: ["Lesson 1: Nazra", "Lesson 2: Tajweed", "Lesson 3: Hifz"],
    classesAttended: [
      { subject: "Tajweed", date: "2026-02-10", tutor: "Sara Ahmed" },
      { subject: "Hifz", date: "2026-02-12", tutor: "Sara Ahmed" },
    ],
    schedule: [
      { day: "Monday", time: "10:00 - 11:00" },
      { day: "Wednesday", time: "14:00 - 15:00" },
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
          <div className="profile-pic">{student.profile ? <img src={student.profile} alt="Profile"/> : "👤"}</div>
          <h3>{student.name}</h3>
          <p>{student.email}</p>
          <p>{student.city}</p>
          <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </aside>

      <main className="dashboard-main">
        <h2>Welcome, {student.name}</h2>

        <div className="dashboard-section">
          <h3>Schedule</h3>
          <div className="card-grid">
            {student.schedule.map((s, i) => (
              <div key={i} className="card">
                <p><strong>{s.day}</strong></p>
                <p>{s.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Classes Attended</h3>
          <div className="card-grid">
            {student.classesAttended.map((c, i) => (
              <div key={i} className="card">
                <p><strong>{c.subject}</strong></p>
                <p>Date: {c.date}</p>
                <p>Tutor: {c.tutor}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Lesson Plans</h3>
          <ul>
            {student.lessonPlans.map((lp, i) => <li key={i}>{lp}</li>)}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
