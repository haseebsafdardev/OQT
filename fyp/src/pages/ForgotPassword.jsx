import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Signup.css";


function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setSent(true);

setTimeout(() => {
  navigate("/reset-password");
}, 2000);
  };
   return (
    <div className="signup-wrapper">
      <div className="signup-card">

        <h2>Reset Password</h2>

        {sent ? (
          <div style={{ color: "#22c55e" }}>
            Reset link sent to your email.
          </div>
        ) : (
          <form onSubmit={handleReset}>
            <input
              type="email"
              placeholder="Enter registered email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <button className="btn primary" type="submit">
              Send Reset Link
            </button>
          </form>
        )}

        <button className="btn outline" onClick={() => navigate("/login")}>
          Back to Login
        </button>
      </div>
    </div>
  );
}
export default ForgotPassword;