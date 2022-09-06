import React from 'react'
import {Outlet, useLocation, Link, useNavigate, Navigate} from "react-router-dom";
import { UserAuth } from '../../contexts/authcontext';

const ProjectManager = () => {
  const navigate = useNavigate();
  const {user, logout} = UserAuth()

  const handleLogout = async () => {
    try {
         await logout();
         navigate('/login');
         console.log('you are logged out');
    } catch (e) {
        console.log(e.message)
    }
};
  
  return (
    <>
    <div>ProjectManager</div>
    <a onClick={handleLogout}>Logout</a>
    </>
    
  )
}

export default ProjectManager