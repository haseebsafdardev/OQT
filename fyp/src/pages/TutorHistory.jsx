import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Dashboard.css";

function History() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser) navigate("/login");
    setUser(loggedUser);
  }, [navigate]);

  // Dummy data for past classes
  const [history, setHistory] = useState([
    { subject: "Tajweed", student: "Ali Khan", date: "2026-01-10" },
    { subject: "Hifz", student: "Ali Khan", date: "2026-01-12" },
  ]);

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="profile-card">
          <img
            className="profile-pic"
            src={user?.profile || "/default-avatar.png"}
            alt="Profile"
          />
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
          <p>{user?.city}</p>
        </div>

        <ul className="sidebar-menu">
          <li onClick={() => navigate(`/${user?.userType.toLowerCase()}-dashboard`)}>
            Dashboard
          </li>
          <li onClick={() => navigate(`/${user?.userType.toLowerCase()}-schedule`)}>
            Schedule
          </li>
          <li onClick={() => navigate(`/${user?.userType.toLowerCase()}-history`)}>
            History
          </li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <h2>{user?.userType} History</h2>
        <div className="card">
          {history.map((h, i) => (
            <div key={i} className="student-row">
              <div className="student-info">
                <p className="name">{h.subject}</p>
                {user?.userType === "Tutor" && <p>Student: {h.student}</p>}
                {user?.userType === "Student" && <p>Tutor: {h.student}</p>}
                <p>Date: {h.date}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default History;
