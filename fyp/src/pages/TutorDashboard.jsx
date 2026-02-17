// src/pages/TutorDashboard.jsx
import { useState } from "react";
import "../style/Dashboard.css";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const SLOTS = Array.from({ length: 24 }, (_, i) => `${i}:00 - ${i + 1}:00`);

function TutorDashboard({ user }) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const toggleSlot = (slot) => {
    setSelectedSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const handleSave = () => {
    // Save timetable to localStorage (or send API request to backend)
    const timetable = { userId: user.userID, days: selectedDays, slots: selectedSlots };
    localStorage.setItem("tutorTimetable", JSON.stringify(timetable));
    alert("Timetable saved!");
  };

  return (
    <div className="dashboard-wrapper">
      <h2>Welcome, {user.name}</h2>

      <section className="timetable">
        <h3>Select Available Days:</h3>
        <div className="days-checkboxes">
          {DAYS.map(day => (
            <label key={day}>
              <input
                type="checkbox"
                checked={selectedDays.includes(day)}
                onChange={() => toggleDay(day)}
              />{" "}
              {day}
            </label>
          ))}
        </div>

        <h3>Select Time Slots (1-hour each):</h3>
        <div className="slots-checkboxes">
          {SLOTS.map(slot => (
            <label key={slot}>
              <input
                type="checkbox"
                checked={selectedSlots.includes(slot)}
                onChange={() => toggleSlot(slot)}
              />{" "}
              {slot}
            </label>
          ))}
        </div>

        <button className="btn primary" onClick={handleSave}>
          Save Timetable
        </button>
      </section>
    </div>
  );
}

export default TutorDashboard;
