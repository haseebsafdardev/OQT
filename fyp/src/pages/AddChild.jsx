import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Signup.css";

const AddChild = () => {
  const navigate = useNavigate();

  const guardian = JSON.parse(localStorage.getItem("guardianUser"));

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [preferredTutor, setPreferredTutor] = useState("");
  const [subject, setSubject] = useState("");
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddChild = (e) => {
    e.preventDefault();

    const childData = {
      guardianEmail: guardian.email,
      name,
      dob,
      gender,
      preferredTutor,
      subject,
      imagePreview
    };

    // Save child in localStorage
    const existingChildren =
      JSON.parse(localStorage.getItem("children")) || [];

    localStorage.setItem(
      "children",
      JSON.stringify([...existingChildren, childData])
    );

    setSuccess(true);

    setTimeout(() => navigate("/guardian-dashboard"), 1500);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2>Add Your Child</h2>

        <div className="profile-image">
          {imagePreview ? <img src={imagePreview} alt="Child" /> : "👶"}
        </div>

        <input
          type="file"
          hidden
          id="child-img"
          accept="image/*"
          onChange={handleImageChange}
        />
        <label htmlFor="child-img" className="btn outline">
          Upload Child Photo
        </label>

        {success && (
          <div className="success-msg">
            Child added successfully!
          </div>
        )}

        <form onSubmit={handleAddChild}>
          <input
            placeholder="Child Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />

          <div className="radio-group">
            <p>Gender</p>
            <label>
              <input
                type="radio"
                value="male"
                onChange={(e) => setGender(e.target.value)}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                onChange={(e) => setGender(e.target.value)}
              />
              Female
            </label>
          </div>

          <div className="radio-group">
            <p>Preferred Tutor</p>
            <label>
              <input
                type="radio"
                value="Male"
                onChange={(e) => setPreferredTutor(e.target.value)}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                onChange={(e) => setPreferredTutor(e.target.value)}
              />
              Female
            </label>
          </div>

          <div className="radio-group">
            <p>What to Learn</p>
            {["Nazra", "Tajweed", "Hifz"].map((sub) => (
              <label key={sub}>
                <input
                  type="radio"
                  value={sub}
                  checked={subject === sub}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
                {sub}
              </label>
            ))}
          </div>

          <button className="btn primary">Add Child</button>
        </form>
      </div>
    </div>
  );
}

export default AddChild;
