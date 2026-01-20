import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function TutorSignup() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [timeZones, setTimeZones] = useState([]);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [timeZone, setTimeZone] = useState("");

  // Load countries on mount
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data.data))
      .catch((err) => console.error(err));
  }, []);

  // Load cities and time zones when country changes
  useEffect(() => {
    if (country) {
      const selected = countries.find((c) => c.country === country);
      setCities(selected ? selected.cities : []);
      setCity("");
      setTimeZone("");

      // Time zones from WorldTimeAPI
      fetch("http://worldtimeapi.org/api/timezone")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((tz) =>
            tz.toLowerCase().includes(country.toLowerCase())
          );
          setTimeZones(filtered);
        });
    }
  }, [country, countries]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">

        {/* Profile Image Circle */}
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
            fontSize: "50px",
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

        {/* Choose Image Button */}
        <input
          type="file"
          accept="image/*"
          id="profileImage"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <label
          htmlFor="profileImage"
          className="btn outline"
          style={{ marginBottom: "20px" }}
        >
          Choose Image
        </label>

        <h2>Create Tutor Account</h2>

        <input type="text" placeholder="Full Name" />
        <input type="date" />
        <input type="email" placeholder="Email" />

        <div className="radio-group">
          <label><input type="radio" name="gender" /> Male</label>
          <label><input type="radio" name="gender" /> Female</label>
        </div>

        {/* Country */}
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c.country} value={c.country}>{c.country}</option>
          ))}
        </select>

        {/* City */}
        <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!country}>
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Time Zone */}
        <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)} disabled={!country}>
          <option value="">Select Time Zone</option>
          {timeZones.map((tz) => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>

        <div className="checkbox-group">
          <label><input type="checkbox" /> Qaida</label>
          <label><input type="checkbox" /> Nazra</label>
          <label><input type="checkbox" /> Tajweed</label>
          <label><input type="checkbox" /> Hifz</label>
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

export default TutorSignup;
