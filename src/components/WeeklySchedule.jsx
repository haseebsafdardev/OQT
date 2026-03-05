import { useState } from "react";
import "../style/Schedule.css";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Generate 24-hour slots
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 0; i < 24; i++) {
    const start = i.toString().padStart(2, "0");
    const end = ((i + 1) % 24).toString().padStart(2, "0");
    slots.push(`${start}:00 - ${end}:00`);
  }
  return slots;
};

const timeSlots = generateTimeSlots();

function WeeklySchedule({ userType }) {
  const [schedule, setSchedule] = useState({});
  const [offDays, setOffDays] = useState([]);

  const toggleSlot = (day, time) => {
    if (offDays.includes(day)) return;

    const key = `${day}_${time}`;
    setSchedule((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleOffDay = (day) => {
    if (offDays.includes(day)) {
      setOffDays(offDays.filter((d) => d !== day));
    } else {
      setOffDays([...offDays, day]);
    }
  };

  const handleSave = async () => {
    const selectedSlots = Object.keys(schedule).filter(
      (key) => schedule[key] === true
    );

    const dataToSend = {
      userType,
      offDays,
      selectedSlots,
    };

    console.log("Schedule Saved:", dataToSend);

    // 🔥 When backend ready:
    // await fetch("/api/schedule/save", { method:"POST", body: JSON.stringify(dataToSend) })

    alert("Schedule saved successfully!");
  };

  return (
    <div className="schedule-wrapper">
      <div className="schedule-header">
        <h2>Manage Weekly Schedule</h2>
      </div>

      {/* Off Days Section */}
      <div className="offday-section">
        <h4>Set Off Days</h4>
        <div className="offday-buttons">
          {days.map((day) => (
            <button
              key={day}
              className={offDays.includes(day) ? "offday active" : "offday"}
              onClick={() => toggleOffDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="schedule-grid">
        <div className="time-header">Time</div>
        {days.map((day) => (
          <div
            key={day}
            className={
              offDays.includes(day)
                ? "day-header offday-header"
                : "day-header"
            }
          >
            {day}
          </div>
        ))}

        {timeSlots.map((time) => (
          <>
            <div key={time} className="time-cell">
              {time}
            </div>

            {days.map((day) => {
              const key = `${day}_${time}`;
              const isOff = offDays.includes(day);

              return (
                <div
                  key={key}
                  className={
                    schedule[key]
                      ? "slot selected"
                      : isOff
                      ? "slot disabled"
                      : "slot"
                  }
                  onClick={() => toggleSlot(day, time)}
                />
                
              );
            })}
          </>
        ))}
        
      </div>

      <div className="save-section">
        <button className="save-btn" onClick={handleSave}>
          Save Schedule
        </button>
      </div>
    </div>
  );
}

export default WeeklySchedule;