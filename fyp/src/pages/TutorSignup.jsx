import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import ctz from "countries-and-timezones";
import "./Signup.css";

function TutorSignup() {
  const navigate = useNavigate();

  // Form state
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [teachingGoals, setTeachingGoals] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Location & timezone
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [timeZones, setTimeZones] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState("");

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  // Handle teaching goals checkboxes
  const handleGoalChange = (goal) => {
    setTeachingGoals(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  // Update time zones when country changes
  useEffect(() => {
    if (!country) {
      setTimeZones([]);
      setSelectedTimeZone("");
      return;
    }

    const tzs = ctz.getTimezonesForCountry(country);
    if (tzs) {
      setTimeZones(tzs);
      setSelectedTimeZone("");
    }
  }, [country]);

  // Form submission
  const handleSignup = (e) => {
    e.preventDefault();

    if (!gender) return alert("Please select your gender.");
    if (teachingGoals.length === 0) return alert("Select at least one teaching goal.");
    if (password !== confirmPassword) return alert("Passwords do not match.");
    if (!country || !state || !city || !selectedTimeZone) return alert("Please select your location and time zone.");

    // Save tutor to localStorage
    const tutors = JSON.parse(localStorage.getItem("tutors") || "[]");
    tutors.push({
      fullName,
      dob,
      email,
      gender,
      teachingGoals,
      password,
      country,
      state,
      city,
      timeZone: selectedTimeZone,
      image
    });
    localStorage.setItem("tutors", JSON.stringify(tutors));

    setSuccess(true);

    setTimeout(() => navigate("/login"), 3000);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">

        {/* Profile Image */}
        <div style={{
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
        }}>
          {image ? <img src={image} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "👤"}
        </div>

        <input type="file" accept="image/*" id="tutorImage" hidden onChange={handleImageChange} />
        <label htmlFor="tutorImage" className="btn outline">Upload Photo</label>

        <h2>Create Tutor Account</h2>

        {success && <div style={{ color: "#22c55e", fontWeight: 600, marginBottom: 15 }}>
          Successfully registered! Redirecting to login...
        </div>}

        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />

          {/* Gender */}
          <div className="radio-group">
            <label><input type="radio" name="gender" value="male" checked={gender === "male"} onChange={e => setGender(e.target.value)} /> Male</label>
            <label><input type="radio" name="gender" value="female" checked={gender === "female"} onChange={e => setGender(e.target.value)} /> Female</label>
          </div>

          {/* Teaching Goals */}
          <div className="checkbox-group">
            <p style={{ fontWeight: 600 }}>I can teach</p>
            {["Qaida", "Nazra", "Tajweed", "Hifz"].map(goal => (
              <label key={goal}><input type="checkbox" checked={teachingGoals.includes(goal)} onChange={() => handleGoalChange(goal)} /> {goal}</label>
            ))}
          </div>

          {/* Location */}
          <select value={country} onChange={e => setCountry(e.target.value)} required>
            <option value="">Select Country</option>
            {Country.getAllCountries().map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
          </select>

          <select value={state} onChange={e => setState(e.target.value)} disabled={!country} required>
            <option value="">Select State</option>
            {State.getStatesOfCountry(country).map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
          </select>

          <select value={city} onChange={e => setCity(e.target.value)} disabled={!state} required>
            <option value="">Select City</option>
            {City.getCitiesOfState(country, state).map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>

          {/* Time Zone */}
          <select value={selectedTimeZone} onChange={e => setSelectedTimeZone(e.target.value)} disabled={!country} required>
            <option value="">Select Time Zone (GMT)</option>
            {timeZones.map(tz => <option key={tz.name} value={tz.name}>{tz.name} (GMT {tz.offsetStr})</option>)}
          </select>

          {/* Password */}
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

          <button type="submit" className="btn primary">Sign Up</button>
        </form>

        <button className="btn outline" onClick={() => navigate("/")}>Back to Welcome</button>
      </div>
    </div>
  );
}

export default TutorSignup;
