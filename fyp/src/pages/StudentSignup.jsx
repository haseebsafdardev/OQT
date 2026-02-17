import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Country, City } from "country-state-city";
import ctz from "countries-and-timezones";
import "../style/Signup.css";

function StudentSignup() {
  const navigate = useNavigate();

  // ✅ Separate states for preview & real file
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

  // ✅ Load timezones when country changes
  useEffect(() => {
    if (!country) {
      setTimeZones([]);
      return;
    }

    const tzs = ctz.getTimezonesForCountry(country);
    setTimeZones(tzs || []);
  }, [country]);

  // ✅ Correct Image Logic
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file); // real file for backend
      setImagePreview(URL.createObjectURL(file)); // preview only
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

    const studentData = {
      name: fullName,
      email: email,
      password: password,
      gender: gender,
      dateOfBirth: dob,
      userType: "Student",
      country: country,
      city: city,
      timezone: selectedTimeZone,
      preferred_tutor: "Male",
      subject: learningGoal
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch(
        "https://localhost:44310/api/Student/addStudent",
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.json();
      console.log(result);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        alert(result.message);
      }

    } catch (error) {
      console.log("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">

        {/* Profile Image */}
        <div className="profile-image">
          {imagePreview ? (
            <img src={imagePreview} alt="Profile" />
          ) : (
            "👤"
          )}
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

        <h2>Create Student Account</h2>

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
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>

          {/* Guardian */}
          <div className="radio-group">
            <p>Are you a guardian?</p>
            <label>
              <input
                type="radio"
                name="guardian"
                value="yes"
                onChange={(e) => setIsGuardian(e.target.value)}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="guardian"
                value="no"
                onChange={(e) => setIsGuardian(e.target.value)}
              />
              No
            </label>
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
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>

          {/* City */}
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          >
            <option value="">Select City</option>
            {country &&
              City.getCitiesOfCountry(country)?.map((c) => (
                <option key={c.name} value={c.name}>
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
              <option key={tz.name} value={tz.name}>
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
