import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import './App.less';
import Home from "./components/Home";
import Login from "./components/Login";
import ProjectManager from "./components/ProjectManager";
import Dashboard from "./components/ProjectManager/Dashboard";
import Project from "./components/ProjectManager/Project";
import BlogPostCreator from "./components/ProjectManager/Project/BlogPostCreator";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./components/SignUp.js";




function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/app" element={<ProtectedRoute><ProjectManager/></ProtectedRoute>}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="project" element={<Project/>}>
          </Route>
        </Route>
        
      </Routes>
  );
}

export default App;
