import React from "react";
import { FaTasks } from "react-icons/fa";
import "../dashboard.css";
// import logo from "../assets/logo.png";
import background from "../assets/background.jpg";
import { useNavigate } from "react-router";

const Homepage = () => {
    const navigate=useNavigate()
  return (
    <div className="homepage" style={{ backgroundImage: `url(${background})` }}>
      <div className="overlay">
        <div className="content">
          {/* <img src={logo} alt="Team Task Manager" className="logo" /> */}
          <h1>Team Task Manager</h1>
          <p>מערכת לניהול משימות חכמה המיועדת לצוותים שרוצים להתייעל ולהשיג יותר</p>
          <button className="enter-btn" onClick={() =>  navigate("/register")}>
            <FaTasks style={{ marginLeft: "8px" }} />
            כניסה למערכת
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
