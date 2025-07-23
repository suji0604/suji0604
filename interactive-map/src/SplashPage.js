import React from "react";
import { useNavigate } from "react-router-dom";
import "./SplashPage.css";

const SplashPage = () => {
  const navigate = useNavigate();

  return (
    <div className="splash-container">
      <div className="splash-content">
        <img
          src="/logo03.png" // Replace with your logo if you have a custom one
          alt="Logo"
          className="splash-logo"
        />
        <h1>INTERACTIVE STORY MAP</h1>
        <button onClick={() => navigate("/landing")}>Let's Go ➜</button>
        
      </div>
    </div>
  );
};

export default SplashPage;
