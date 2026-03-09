import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/Student/signup.css';
import { ipconfig } from "../../config";
import { useAuth } from "../../context/Auth";
export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("rehan123@gmail.com");
  const [password, setPassword] = useState("1234567890");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${ipconfig}/auth/login?email=${email}&password=${password}`, { method: "POST" }
      );
      console.log(response);
      const result = await response.json();
      setLoading(false);
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      setSuccess(true);
      await login(result?.user);
      if (result?.user?.userType === "Student" || result?.user?.userType === "Child") {
        navigate("/student-dashboard");
      } else if (result?.user?.userType === "Tutor") {
        navigate("/tutor-dashboard");
      } else if (result?.user?.userType === "Guardian") {
        navigate("/tutor-dashboard");
      }

    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };


  return (
    <div className="signup-wrapper" style={{ position: "relative" }}>

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

        {/* <p
          style={{
            marginTop: 10,
            fontSize: 14,
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p> */}

        <button className="btn outline" onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </div>
  );
}

