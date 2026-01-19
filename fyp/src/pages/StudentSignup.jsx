import "./Signup.css";
import { useNavigate } from "react-router-dom";

function StudentSignup() {
  const navigate = useNavigate();

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2>Create Student Account</h2>

        <input type="text" placeholder="Name" />
        <input type="date" />
        <input type="email" placeholder="Email" />

        <div className="radio-group">
          <label><input type="radio" name="gender" /> Male</label>
          <label><input type="radio" name="gender" /> Female</label>
        </div>

        <select><option>Country</option></select>
        <select><option>City</option></select>
        <select><option>Time Zone</option></select>

        <div className="radio-group">
          <p>Are you a guardian?</p>
          <label><input type="radio" name="guardian" /> Yes</label>
          <label><input type="radio" name="guardian" /> No</label>
        </div>

        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />

        <button className="btn primary">Sign Up</button>
        <button className="btn outline" onClick={() => navigate("/")}>
          Back to Welcome
        </button>
      </div>
    </div>
  );
}

export default StudentSignup;
