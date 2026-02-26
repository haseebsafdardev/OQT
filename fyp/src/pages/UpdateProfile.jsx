import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Profile.css";

function UpdateProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login");
      return;
    }
    setUser(loggedInUser);
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, profile: imageUrl });
    }
  };

  const handleSave = () => {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setEditing(false);
    alert("Profile updated successfully!");
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* Header */}
        <div className="profile-top">
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
          <h2>My Profile</h2>
        </div>

        {/* Profile Section */}
        <div className="profile-content">

          {/* Left Side */}
          <div className="profile-left">
            <img
              src={user.profile || "/default-avatar.png"}
              alt="Profile"
              className="profile-img"
            />

            {editing && (
              <>
                <input
                  type="file"
                  id="profileUpload"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label htmlFor="profileUpload" className="upload-btn">
                  Change Photo
                </label>
              </>
            )}

            <h3>{user.name}</h3>
            <p className="location">{user.city}, Pakistan</p>
          </div>

          {/* Right Side */}
          <div className="profile-right">
            {["name", "city", "email"].map((field) => (
              <div key={field} className="form-group">
                <label>{field.toUpperCase()}</label>
                {editing ? (
                  <input
                    type="text"
                    name={field}
                    value={user[field] || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="info-box">{user[field]}</div>
                )}
              </div>
            ))}

            <div className="profile-buttons">
              {editing ? (
                <button className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
              ) : (
                <button className="edit-btn" onClick={() => setEditing(true)}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;