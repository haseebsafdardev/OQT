import "./Welcome.css";
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
      <div className="quran-pattern">
        {ayats.map((ayat, index) => (
          <span key={index} className="ayat">{ayat}</span>
        ))}
      </div>

      <div className="welcome-card">
        <img src="/Logo.png" alt="Online Quran Tutor" className="logo" />
        <h1 className="title">Learn Quran Anytime, Anywhere</h1>

        <button
          className="btn primary"
          onClick={() => navigate("/signup-student")}
        >
          Sign Up as Student
        </button>
        <button className="btn outline">Sign In</button>

        <div className="divider">OR</div>

        <button
          className="btn primary"
          onClick={() => navigate("/signup-tutor")}
        >
          Sign Up as Tutor
        </button>
        <button className="btn outline">Sign In</button>
      </div>
    </div>
  );
}

export default Welcome;
