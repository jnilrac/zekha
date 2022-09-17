import React from 'react'
import ProjectsArea from './ProjectsArea'
import { UserAuth } from '../../../contexts/authcontext'
import { useOutletContext } from "react-router-dom";
const Dashboard = () => {
  const [currentProject, setCurrentProject] = useOutletContext();
  console.log(currentProject)
  const {user} = UserAuth();
  const uid = user.uid;
  return (
    <>
      <ProjectsArea curProj={[currentProject, setCurrentProject]} uid={uid} />
    </>
  )
}

export default Dashboard