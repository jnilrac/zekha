import React, {useEffect, useState} from 'react'
import { Col, Row, Divider, List, Button, Space } from 'antd';
import { db } from '../../../services/firebase';
import { doc, query, where, onSnapshot, collection, deleteDoc, setDoc, updateDoc, serverTimestamp, getDocs} from "firebase/firestore";
import NewProject from './NewProject';
import ProjectsCard from './ProjectsCard';




const ProjectsArea = ({curProj, uid}) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = curProj;

  useEffect(() => {
    
    // Firebase realtime listenter

     if(uid){ 
      
      const q = query(collection(db, "projects"), where("projectCreator", "==", uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projectArray = [];
      querySnapshot.forEach((doc) => {
        const {projectCreator, projectTitle, timestamp, blogNumber}= doc.data();

        const dataFields = {
            key: doc.id,
            title:projectTitle,
            blogNumber:blogNumber,
            projectCreator: projectCreator,
            timestamp: timestamp,
         }
         projectArray.push(dataFields)
        
      });
      setProjects(projectArray)
      
});

  return () => {
    unsubscribe();
    }
}


},[uid])

  return (
    <>
    <Row>
        <Col style={{margin:20}}><h1>Projects</h1></Col>
    </Row>
    <Row style={{margin:30}} justify='center'>
      <Space size={20}>
        <Col>
            <h3>New Project</h3>
          </Col>
          <Col>
            <NewProject uid={uid} />
          </Col>
      </Space> 
    </Row>
    <Divider />
    <Row justify='center'>
        <Col span={24} style={{ borderRadius:"10px", opacity:"0.5", padding:"20px"}}>
          <List
              grid={{
                gutter: 16,
                column: 4,
              }}
              dataSource={projects}
              renderItem={(item) => (
                <ProjectsCard curProj={[currentProject, setCurrentProject]} uid={uid} item={item} />
              )}
            />
        </Col>
    </Row>
    </>
  )
}

export default ProjectsArea