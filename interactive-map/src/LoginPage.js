import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "user@example.com" && password === "pass") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/map");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        {/* Replace this background image with your own */}
      </div>
      <div className="login-right">
        <h2>
          <span style={{ fontWeight: "bold", color: "#4d7c7c" }}>Hello,</span>{" "}
          Guyss!
        </h2>

        <div className="tabs">
          <span className="active-tab">Login</span>
          <span className="inactive-tab">SignUp</span>
        </div>

        <div className="form-group">
          <label>Enter your email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Enter Password</label>
          <div className="password-wrapper">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="eye-icon">👁️</span>
          </div>
        </div>

        <div className="forgot-password">Forgot Password?</div>

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <div className="or-separator">Or</div>

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google logo"
          className="google-logo"
        />
      </div>
    </div>
  );
}
