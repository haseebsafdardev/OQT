import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function StudentSignup() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [timeZones, setTimeZones] = useState([]);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [timeZone, setTimeZone] = useState("");

  /* Load Countries */
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then(res => res.json())
      .then(data => setCountries(data.data))
      .catch(err => console.error(err));
  }, []);

  /* Load Cities & Timezones when Country changes */
  useEffect(() => {
    if (!country) return;

    const selected = countries.find(c => c.country === country);
    setCities(selected ? selected.cities : []);
    setCity("");
    setTimeZone("");

    fetch("http://worldtimeapi.org/api/timezone")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(tz =>
          tz.toLowerCase().includes(country.toLowerCase())
        );
        setTimeZones(filtered);
      });
  }, [country, countries]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // simulate successful registration
    setSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">

        {/* Profile Image */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#cddc39",
            margin: "0 auto 20px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "50px"
          }}
        >
          {image ? (
            <img
              src={image}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            "👤"
          )}
        </div>

        {/* Upload */}
        <input
          type="file"
          accept="image/*"
          id="studentImage"
          hidden
          onChange={handleImageChange}
        />
        <label htmlFor="studentImage" className="btn outline">
          Upload Photo
        </label>

        <h2>Create Student Account</h2>

        {success && (
          <div style={{ color: "#22c55e", fontWeight: 600, marginBottom: 15 }}>
            Successfully registered! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" required />
          <input type="date" required />
          <input type="email" placeholder="Email" required />

          <div className="radio-group">
            <label><input type="radio" name="gender" required /> Male</label>
            <label><input type="radio" name="gender" required /> Female</label>
          </div>

          {/* Country */}
          <select value={country} onChange={e => setCountry(e.target.value)} required>
            <option value="">Select Country</option>
            {countries.map(c => (
              <option key={c.country} value={c.country}>
                {c.country}
              </option>
            ))}
          </select>

          {/* City */}
          <select value={city} onChange={e => setCity(e.target.value)} disabled={!country} required>
            <option value="">Select City</option>
            {cities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Time Zone */}
          <select
            value={timeZone}
            onChange={e => setTimeZone(e.target.value)}
            disabled={!country}
            required
          >
            <option value="">Select Time Zone</option>
            {timeZones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>

          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />

          <button type="submit" className="btn primary">
            Sign Up
          </button>
        </form>

        <button className="btn outline" onClick={() => navigate("/")}>
          Back to Welcome
        </button>
      </div>
    </div>
  );
}

export default StudentSignup;
