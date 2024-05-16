import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import "./styles.css";

import { environment } from "../../environments/environment";

function Login() {
  const { user, login, logout } = useContext(AuthContext);

  const [loginDetails, setLoginDetails] = useState({
    Username: "",
    Password: "",
  });
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  function handleResponse(data) {
    login(data);
  }

  // log out and redirect to homepage if already logged in
  useEffect(() => {
    if (user) {
      logout();
      navigate("/");
    }
  }, [user, navigate, logout]);

  function handleSubmit(event) {
    event.preventDefault();
    // Logs in by making post request
    fetch(`${environment.apiUrl}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDetails),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => handleResponse(data));
      } else {
        setInvalid(true);
      }
    });
  }

  return (
    <div className="login">
      <h2>Log In</h2>
      {invalid && <span>Invalid username or password</span>}
      <form onSubmit={handleSubmit}>
        <div className="login-form">
          <label>Username</label>
          <input
            type="text"
            name="username"
            required
            onChange={handleChange}
            value={loginDetails.username}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={loginDetails.password}
          />
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      <Link to="/signup" className="signup-link">
        I don&apos;t have a user
      </Link>
    </div>
  );
}

export default Login;