import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Signup.css";

function ResetPassword() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setSuccess(true);

    // 🔥 When backend is ready:
    // Send new password to server here

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2>Create New Password</h2>

        {success ? (
          <div style={{ color: "#22c55e" }}>
            Password updated successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && (
              <div style={{ color: "#ef4444", marginBottom: "10px" }}>
                {error}
              </div>
            )}

            <button className="btn primary" type="submit">
              Update Password
            </button>
          </form>
        )}

        <button
          className="btn outline"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;