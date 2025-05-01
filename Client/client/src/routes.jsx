import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Components/login";
import SignUpForm from "./Components/register";
import Dashboard from "./Components/dashboard";
import TeamsList from "./Components/teamsList";
import TeamTasks from "./Components/teamTasks";
import TaskDetails from "./Components/taskDetails";
import Profile from "./Components/profile";



const AppRoutes = () => {
  const [login,setLogin]=useState(false)

  const handleLogin=()=>{
    setLogin(true)
    console.log(login)
  }

  return (
    <Routes>
     
      <Route path="/login" element={<LoginForm onLogin={handleLogin}/>} />
      <Route path="/register" element={<SignUpForm onLogin={handleLogin}/>} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="teams" element={<TeamsList />} />
      <Route path="teams/:teamId/tasks" element={<TeamTasks />} />
      <Route path="tasks/:taskId" element={<TaskDetails />} />
      <Route path="profile" element={<Profile />} />
  
    </Routes>
  );
};

export default AppRoutes;
