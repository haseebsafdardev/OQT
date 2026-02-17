import "../style/Welcome.css";
import { useNavigate } from "react-router-dom";

const ayats = [
  "﷽",
  "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ",
  "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
  "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
  "فَاقْرَءُوا مَا تَيَسَّرَ مِنَ الْقُرْآنِ"
];

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-wrapper">

      {/* Quranic Watermarks */}
      <div className="quran-pattern">
        {ayats.map((ayat, index) => (
          <span key={index} className="ayat">{ayat}</span>
        ))}
      </div>

      {/* Welcome Card */}
      <div className="welcome-card">
        <img src="/Logo.png" alt="Online Quran Tutor" className="logo" />
        <h1 className="title">Learn Quran Anytime, Anywhere</h1>

        {/* Student Signup */}
        <button
          className="btn primary"
          onClick={() => navigate("/signup-student")}
        >
          Sign Up as Student
        </button>

        {/* Student Login */}
        <button
          className="btn outline"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>

        <div className="divider">OR</div>

        {/* Tutor Signup */}
        <button
          className="btn primary"
          onClick={() => navigate("/signup-tutor")}
        >
          Sign Up as Tutor
        </button>

        {/* Tutor Login */}
        <button
          className="btn outline"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Welcome;
