import React from 'react'
import { Card, List, Row, Col, Button, Space, Statistic, Popconfirm, message, Divider} from 'antd';
import { useNavigate } from 'react-router-dom';


const ProjectsCard = (props) => {
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
    navigate('/app/project')
  };




  return (
    
    <List.Item style={{margin:"10px"}}>
        <Card style={{ backgroundColor: "white",borderRadius:"20px", boxShadow:"2px 2px 10px 1px grey"}} title={props.item.title}>
          <Row>
            <Space size={10}>
              <Col>
              <strong><h3 style={{marginTop:8}}>Posts Created:</h3></strong>
              </Col>
              <Col>
              <Statistic value={20}/>
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
                  title="Are you sure to delete this task?"
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