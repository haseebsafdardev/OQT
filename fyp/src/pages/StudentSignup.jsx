import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Country, City } from "country-state-city";
import ctz from "countries-and-timezones";
import "../style/Signup.css";

function StudentSignup() {
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [isGuardian, setIsGuardian] = useState("");
  const [learningGoal, setLearningGoal] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [timeZones, setTimeZones] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState("");

  // ✅ Load timezones
  useEffect(() => {
    if (!country) {
      setTimeZones([]);
      return;
    }

    const tzs = ctz.getTimezonesForCountry(country);
    setTimeZones(tzs || []);
  }, [country]);

  // ✅ Image Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!learningGoal) {
      alert("Please select what you want to learn.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userType = isGuardian === "yes" ? "Guardian" : "Student";

    const userData = {
      name: fullName,
      email,
      password,
      gender,
      dateOfBirth: dob,
      userType,
      country,
      city,
      timezone: selectedTimeZone,
      preferred_tutor: "Male",
      subject: learningGoal
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(userData));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    const apiUrl =
      userType === "Guardian"
        ? "https://localhost:44310/api/guardian/add"
        : "https://localhost:44310/api/students/add";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        alert(result.message);
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">

        {/* Profile Image */}
        <div className="profile-image">
          {imagePreview ? <img src={imagePreview} alt="Profile" /> : "👤"}
        </div>

        <input
          type="file"
          id="img"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />

        <label htmlFor="img" className="btn outline">
          Upload Photo
        </label>

        <h2>Create Account</h2>

        {success && (
          <div className="success-msg">
            Registration successful! Redirecting...
          </div>
        )}

        <form onSubmit={handleSignup}>

          <input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Gender */}
          <div className="radio-group">
            <p>Gender</p>
            {["male", "female"].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>

          {/* Guardian */}
          <div className="radio-group">
            <p>Are you a guardian?</p>
            {["yes", "no"].map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name="guardian"
                  value={value}
                  checked={isGuardian === value}
                  onChange={(e) => setIsGuardian(e.target.value)}
                  required
                />
                {value.toUpperCase()}
              </label>
            ))}
          </div>

          {/* Learning Goal */}
          <div className="radio-group">
            <p>I want to learn</p>
            {["Hifz", "Tajweed", "Nazra"].map((goal) => (
              <label key={goal}>
                <input
                  type="radio"
                  name="learning"
                  value={goal}
                  checked={learningGoal === goal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  required
                />
                {goal}
              </label>
            ))}
          </div>

          {/* Country */}
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setCity("");
            }}
            required
          >
            <option value="">Select Country</option>
            {Country.getAllCountries().map((c) => (
              <option key={`${c.isoCode}-${c.name}`} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>

          {/* City (FIXED UNIQUE KEY) */}
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          >
            <option value="">Select City</option>
            {country &&
              City.getCitiesOfCountry(country)?.map((c, index) => (
                <option
                  key={`${c.name}-${c.stateCode}-${c.latitude}-${index}`}
                  value={c.name}
                >
                  {c.name}
                </option>
              ))}
          </select>

          {/* Timezone */}
          <select
            value={selectedTimeZone}
            onChange={(e) => setSelectedTimeZone(e.target.value)}
            required
          >
            <option value="">Select Time Zone (GMT)</option>
            {timeZones.map((tz) => (
              <option key={`${tz.name}-${tz.utcOffset}`} value={tz.name}>
                {tz.name} (GMT {tz.offsetStr})
              </option>
            ))}
          </select>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button className="btn primary">Sign Up</button>
        </form>

        <button
          className="btn outline"
          onClick={() => navigate("/")}
        >
          Back to Welcome
        </button>

      </div>
    </div>
  );
}

export default StudentSignup;