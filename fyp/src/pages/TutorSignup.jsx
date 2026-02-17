import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import ctz from "countries-and-timezones";
import "../style/Signup.css";

function TutorSignup() {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [teachingGoals, setTeachingGoals] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [timeZones, setTimeZones] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState("");

  // Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Teaching goals
  const handleGoalChange = (goal) => {
    setTeachingGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  // Timezone update
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

  // API Submit
const handleSignup = async (e) => {
  e.preventDefault();

  if (!gender) return alert("Please select gender");
  if (teachingGoals.length === 0)
    return alert("Select at least one teaching goal");
  if (password !== confirmPassword)
    return alert("Passwords do not match");

  try {
    setLoading(true);

    const formData = new FormData();

    const tutorObject = {
      name: fullName,
      email: email,
      password: password,
      gender: gender,
      dateOfBirth: dob,
      userType: "Tutor",
      country: country,
      city: city,
      timezone: selectedTimeZone,
      subjectList: teachingGoals.map((g) => ({ name: g })),
    };

    formData.append("tutor", JSON.stringify(tutorObject));

    if (image) {
      formData.append("tutorImage", image);
    }

    // ✅ FIX: store response
    const response = await fetch(
      "https://localhost:44310/api/Tutor/addTutor",
      {
        method: "POST",
        body: formData,
      }
    );

    // Check if server returned anything
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
      throw new Error(data?.message || "Registration failed");
    }

    setSuccess(true);

    setTimeout(() => {
      navigate("/login");
    }, 2000);

  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="signup-wrapper">
      <div className="signup-card">

        {/* Profile Preview */}
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
          {preview
            ? <img src={preview} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : "👤"}
        </div>

        <input type="file" accept="image/*" hidden id="imageUpload" onChange={handleImageChange} />
        <label htmlFor="imageUpload" className="btn outline">Upload Photo</label>

        <h2>Create Tutor Account</h2>

        {success && (
          <div style={{ color: "green", marginBottom: 15 }}>
            Successfully registered! Redirecting...
          </div>
        )}

        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />

          {/* Gender */}
          <div className="radio-group">
            <label>
              <input type="radio" value="male" checked={gender === "male"} onChange={e => setGender(e.target.value)} />
              Male
            </label>
            <label>
              <input type="radio" value="female" checked={gender === "female"} onChange={e => setGender(e.target.value)} />
              Female
            </label>
          </div>

          {/* Teaching Goals */}
          <div className="checkbox-group">
            <p><strong>I can teach</strong></p>
            {["Qaida", "Nazra", "Tajweed", "Hifz"].map(goal => (
              <label key={goal}>
                <input
                  type="checkbox"
                  checked={teachingGoals.includes(goal)}
                  onChange={() => handleGoalChange(goal)}
                />
                {goal}
              </label>
            ))}
          </div>

          {/* Location */}
          <select value={country} onChange={e => setCountry(e.target.value)} required>
            <option value="">Select Country</option>
            {Country.getAllCountries().map(c => (
              <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
            ))}
          </select>

          <select value={state} onChange={e => setState(e.target.value)} disabled={!country} required>
            <option value="">Select State</option>
            {State.getStatesOfCountry(country).map(s => (
              <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
            ))}
          </select>

          <select value={city} onChange={e => setCity(e.target.value)} disabled={!state} required>
            <option value="">Select City</option>
            {City.getCitiesOfState(country, state).map(c => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>

          <select value={selectedTimeZone} onChange={e => setSelectedTimeZone(e.target.value)} required>
            <option value="">Select Time Zone</option>
            {timeZones.map(tz => (
              <option key={tz.name} value={tz.name}>
                {tz.name} (GMT {tz.offsetStr})
              </option>
            ))}
          </select>

          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <button className="btn outline" onClick={() => navigate("/")}>
          Back to Welcome
        </button>
      </div>
    </div>
  );
}

export default TutorSignup;
