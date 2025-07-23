import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <header className="header">
      <h2 className="logo">Interactive Story Map</h2>
      <nav>
        <Link to="/landing">Home</Link>

        {isLoggedIn && (
          <Link to="/map">Map</Link>
        )}

        <Link to="/contact">Contact</Link>

        {!isLoggedIn ? (
          <Link to="/login" className="login-button">Login</Link>
        ) : (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
