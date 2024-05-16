import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { environment } from "../../environments/environment";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleResponse(data) {

    // Navigate to login page
    navigate(`/login`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Signs up by making post request
    fetch(`${environment.apiUrl}signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => handleResponse(data));
      } else {
        setInvalid(true);
      }
    });
  }

  return (
    <div className="signup">
      <h2>Register New User</h2>
      {invalid && <span>Email already in use</span>}
      <form onSubmit={handleSubmit} className="signup-form">
        <label>Username</label>
        <input
          type="text"
          name="username"
          required
          onChange={handleChange}
          value={formData.username}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={formData.email}
        />
        <label>Password</label>
        <p>Beware, password is stored in DB as plaintext</p>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={formData.password}
        />
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login" className="login-link">
        I already have a user
      </Link>
    </div>
  );
}

export default Signup;