import React, {useState, useEffect} from 'react'
import { Card, List, Row, Col, Button, Space, Statistic, Popconfirm, message, Divider} from 'antd';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../services/firebase';
import {getDocs, query, where, collection} from "firebase/firestore";


const ProjectsCard = ({ curProj, uid , item}) => {
  const[currentProject, setCurrentProject] = curProj;
  const[blogNumber, setBlogNumber] = useState(0);
  const navigate = useNavigate();
  const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };
  
  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  const openProject = () => {
    setCurrentProject(project => ({...project, key:item.key, title:item.title, blogNumber:item.blogNumber}))
    navigate('/app/project')
  };

 const getBlogNumber =  async () => {
 
  const q = query(collection(db, "posts"), where("parentProject", "==", item.key));

  const querySnapshot = await getDocs(q);
  const blogArray = [];
  querySnapshot.forEach((doc) => {
    blogArray.push(doc);
  });
  const blogCount = blogArray.length;
  setBlogNumber(blogCount);
  
 };

 useEffect(() =>{
  getBlogNumber();
 },[]);

  return (
    
    <List.Item style={{margin:"10px"}}>
        <Card style={{ backgroundColor: "white",borderRadius:"20px", boxShadow:"2px 2px 10px 1px grey"}} title={item.title}>
          <Row>
            <Space size={10}>
              <Col>
              <strong><h3 style={{marginTop:8}}>Posts Created:</h3></strong>
              </Col>
              <Col>
              <Statistic value={blogNumber}/>
              </Col>
            </Space>
          </Row>
          <Divider />
          <Row justify='center'>
            <Space size={30}>
              <Col>
                <Button onClick={openProject} type="primary">Open</Button>
              </Col>
              <Col>
                <Popconfirm
                  title="Are you sure to delete this project?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger">Delete</Button>
                </Popconfirm>
              </Col>
            </Space>
          </Row>
        </Card>
    </List.Item>
  
  )
}

export default ProjectsCard