import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Dashboard.css";

const GuardianDashboard = () => {
  const navigate = useNavigate();
  const guardian = JSON.parse(localStorage.getItem("guardianUser"));
  
  const [children, setChildren] = useState([]);

  useEffect(() => {
  const fetchChildren = async () => {
    const response = await fetch(
      `https://localhost:44310/api/guardian/${guardian.userID}/children`
    );

    const result = await response.json();

    if (result.success) {
      setChildren(result.data);
    }
  };

  fetchChildren();
}, []);

  const handleLogout = () => {
    localStorage.removeItem("guardianUser");
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="dashboard-sidebar">
        <div className="profile-card">
          <h3>{guardian?.name}</h3>
          <p>{guardian?.email}</p>
          <button className="btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <ul className="sidebar-menu">
          <li onClick={() => navigate("/guardian-dashboard")}>
            Dashboard
          </li>
          <li onClick={() => navigate("/add-child")}>
            Add Child
          </li>
        </ul>
      </aside>

      <main className="dashboard-main">
        <h2>Your Children</h2>

        {children.length === 0 ? (
          <p>No children added yet.</p>
        ) : (
          children.map((child, index) => (
            <div key={index} className="card">
              <h3>{child?.name}</h3>
              <p>DOB: {child?.dob}</p>
              <p>Gender: {child?.gender}</p>
              <p>Subject: {child?.subject}</p>
              <p>Preferred Tutor: {child?.preferredTutor}</p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

export default GuardianDashboard;
