import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔹 Get users from localStorage
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const tutors = JSON.parse(localStorage.getItem("tutors")) || [];

    // 🔹 Merge users with roles
    const allUsers = [
      ...students.map(u => ({ ...u, role: "student" })),
      ...tutors.map(u => ({ ...u, role: "tutor" }))
    ];

    // 🔹 Find user
    const user = allUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      setMessage("Email is not registered");
      return;
    }

    if (user.password !== password) {
      setMessage("Incorrect password");
      return;
    }

    // 🔹 Save logged-in user session
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    setMessage("");
    setSuccess(true);

    setTimeout(() => {
      if (user.role === "student") {
        navigate("/student-dashboard");
      } else {
        navigate("/tutor-dashboard");
      }
    }, 1200);
  };

  return (
    <div className="signup-wrapper" style={{ position: "relative" }}>

      {/* Quranic Watermark */}
      <div className="quran-bg">
        <span>﷽</span>
      </div>

      <div className="signup-card">

        {/* Logo */}
        <img
          src="/Logo.png"
          alt="Online Quran Tutor"
          style={{ width: "120px", marginBottom: "12px" }}
        />

        <h2>Login</h2>

        {message && (
          <div style={{ color: "#ff6b6b", marginBottom: 12 }}>
            {message}
          </div>
        )}

        {success && (
          <div style={{ color: "#22c55e", marginBottom: 12 }}>
            Login successful! Redirecting...
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn primary">
            Login
          </button>
        </form>

        <p
          style={{
            marginTop: 10,
            fontSize: 14,
            cursor: "pointer",
            textDecoration: "underline"
          }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>

        <button className="btn outline" onClick={() => navigate("/")}>
          Back to Welcome
        </button>
      </div>
    </div>
  );
}

export default Login;
