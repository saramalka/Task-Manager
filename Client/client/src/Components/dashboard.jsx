import React from "react";
import { FaTasks } from "react-icons/fa";
import "../dashboard.css";
// import logo from "../assets/logo.png";
import background from "../assets/background.jpg";
import { useNavigate } from "react-router";

const Dashboard = () => {
    const navigate=useNavigate()
  return (
    <div className="homepage" style={{ backgroundImage: `url(${background})` }}>
      <div className="overlay">
        <div className="content">
         DASHBOARD
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
