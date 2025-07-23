import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
        <div className="landing-content">
            <div className="landing-image">
                <img src="/images/landing-image.png" alt="Landing" />
                <img src="/images/landing-image2.png" alt="Earth" className="earth-image" />
            </div>
            <h1>Explore Stories Across The World</h1>
            <p>Discover And Share Your Personal Stories On Our Interactive Map.</p>
            <button onClick={() => navigate("/map")}>Get Started</button>

        </div>
    </div>

  );
};

export default LandingPage;
