import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("http://localhost:4444/api/auth/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Task Manager</Link>
      </div>
      <div className="navbar-right">
        {userInfo ? (
          <>
            <span>Welcome, {userInfo.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;