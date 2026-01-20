import "./TutorDashboard.css";

function TutorDashboard() {
  // TEMP DATA (later replace with backend)
  const tutor = {
    name: "Muhammad Zain",
    course: "Nazra",
    classesHeld: 5,
    missedClasses: 0,
    studentName: "Ali Saif",
    time: "12:30 - 13:00",
    lesson: "Qaida",
    verse: "1 - 5",
    day: "Monday",
    image: "/student.jpg"
  };

  return (
    <div className="dashboard-wrapper">

      {/* Header */}
      <header className="dashboard-header">
        <h2>{tutor.name}</h2>
        <img
          src="/profile.jpg"
          alt="Tutor"
          className="profile-pic"
        />
      </header>

      {/* Weekly Card */}
      <div className="card weekly-card">
        <div>
          <p><strong>Weekly Classes</strong></p>
          <p>Course: {tutor.course}</p>
        </div>
        <div className="stats">
          <p>Classes Held: <strong>{tutor.classesHeld}</strong></p>
          <p>Missed: <strong>{tutor.missedClasses}</strong></p>
        </div>
      </div>

      {/* Upcoming Class */}
      <div className="card upcoming-card">
        <h3>Upcoming Class</h3>

        <div className="student-row">
          <img src={tutor.image} alt="Student" />
          <div className="student-info">
            <p className="name">{tutor.studentName}</p>
            <p>{tutor.time}</p>
            <p>{tutor.lesson}</p>
            <p>Verse ({tutor.verse})</p>
          </div>

          <div className="action">
            <p>{tutor.day}</p>
            <button>Start Now</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default TutorDashboard;
