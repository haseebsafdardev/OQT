import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Signup.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setMessage("");
  setLoading(true);

  try {
    const response = await fetch(
      "https://localhost:44310/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }

    // ✅ Save user in localStorage
localStorage.setItem("loggedInUser", JSON.stringify(result.user));

    setSuccess(true);

    // ✅ Redirect based on userType
    setTimeout(() => {
      if (result.user.userType === "Student") {
        navigate("/student-dashboard");
      } else if (result.user.userType === "Tutor") {
        navigate("/tutor-dashboard");
      }
    }, 1000);

  } catch (error) {
    setLoading(false);
    setMessage(error.message);
  }
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
          <div style={{ color: "#ff6b6b", marginBottom: 12 }}>{message}</div>
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
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p
          style={{
            marginTop: 10,
            fontSize: 14,
            cursor: "pointer",
            textDecoration: "underline",
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
