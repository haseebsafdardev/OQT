import "./Welcome.css";

const ayats = [
  "﷽",
  "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ",
  "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
  "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
  "فَاقْرَءُوا مَا تَيَسَّرَ مِنَ الْقُرْآنِ"
];

function Welcome() {
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

        <button className="btn primary">Sign Up as Student</button>
        <button className="btn outline">Sign In</button>

        <div className="divider">OR</div>

        <button className="btn primary">Sign Up as Tutor</button>
        <button className="btn outline">Sign In</button>
      </div>
    </div>
  );
}

export default Welcome;
