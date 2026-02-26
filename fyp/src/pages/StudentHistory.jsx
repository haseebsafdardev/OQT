import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Dashboard.css";

function Schedule() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedUser) navigate("/login");
    setUser(loggedUser);
  }, [navigate]);

  // Dummy schedule data
  const [schedule, setSchedule] = useState([
    { day: "Monday", time: "09:00-10:00" },
    { day: "Wednesday", time: "11:00-12:00" },
    { day: "Friday", time: "14:00-15:00" },
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
        <h2>{user?.userType} Schedule</h2>
        <div className="card">
          {schedule.map((s, i) => (
            <div key={i} className="weekly-card">
              <span>{s.day}</span>
              <span>{s.time}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Schedule;
