import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/login");
    }
  }, [navigate, user]);

  if (!user) return null;

  return (
    <div className="dashboard-wrapper">

      {/* Top Bar */}
      <div className="dashboard-header">
        <div className="header-left">
          <h3>{user.fullName}</h3>
          <span>Student</span>
        </div>
        <img
          src={user.image || "https://i.pravatar.cc/100"}
          alt="profile"
          className="profile-pic"
        />
      </div>

      {/* Main Content */}
      <div className="dashboard-content">

        {/* Weekly Card */}
        <div className="weekly-card">
          <div className="weekly-top">
            <div>
              <p className="title">Weekly Classes</p>
              <p>Course: <strong>Nazra</strong></p>
            </div>
            <div className="stats">
              <p>Classes Held: <strong>1</strong></p>
              <p>Missed Classes: <strong>1</strong></p>
            </div>
          </div>

          <div className="divider"></div>

          {/* Upcoming Class */}
          <p className="subtitle">Upcoming Class</p>

          <div className="class-row">
            <img
              src="https://i.pravatar.cc/80"
              alt="Tutor"
              className="tutor-pic"
            />

            <div className="class-info">
              <h4>Muhammad Zain</h4>
              <p>12:30 – 13:00 · Mon</p>
              <p className="small">Lesson Plan 1 · Verse (1–5)</p>
            </div>

            <button className="join-btn">Join</button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button className="active">Home</button>
        <button>Schedule</button>
        <button>Manage</button>
        <button>Tutors</button>
        <button>History</button>
      </div>
    </div>
  );
}

export default StudentDashboard;
