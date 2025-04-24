import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Components/login";
import SignUpForm from "./Components/register";
import Dashboard from "./Components/dashboard";
import Teams from "./Components/teamsList";
import TeamTasks from "./Components/teamTasks";
import TaskDetails from "./Components/taskDetails";
import Profile from "./Components/profile";


const AppRoutes = () => {
  return (
    <Routes>
     
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<SignUpForm />} />

    
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="teams" element={<Teams />} />
        <Route path="teams/:teamId/tasks" element={<TeamTasks />} />
        <Route path="tasks/:taskId" element={<TaskDetails />} />
        <Route path="profile" element={<Profile />} />
  

     
    </Routes>
  );
};

export default AppRoutes;
