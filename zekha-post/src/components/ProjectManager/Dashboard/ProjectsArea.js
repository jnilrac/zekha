import React from 'react'
import { Col, Row, Divider, List, Button, Space } from 'antd';
import NewProject from './NewProject';
import ProjectsCard from './ProjectsCard';

const data = [
    {
      title: 'Project 1',
    },
    {
      title: 'Project 2',
    },
    {
      title: 'Project 3',
    },
    {
      title: 'Project 4',
    },
    {
        title: 'Project 1',
      },
      {
        title: 'Project 2',
      },
      {
        title: 'Project 3',
      },
      {
        title: 'Project 4',
      },
      {
        title: 'Project 1',
      },
      {
        title: 'Project 2',
      },
      {
        title: 'Project 3',
      },
      {
        title: 'Project 4',
      },
      {
        title: 'Project 1',
      },
      {
        title: 'Project 2',
      },
      {
        title: 'Project 3',
      },
      {
        title: 'Project 4',
      },
      {
        title: 'Project 1',
      },
      {
        title: 'Project 2',
      },
      {
        title: 'Project 3',
      },
      {
        title: 'Project 4',
      },{
        title: 'Project 1',
      },
      {
        title: 'Project 2',
      },
      {
        title: 'Project 3',
      },
      {
        title: 'Project 4',
      },
  ];

const ProjectsArea = () => {
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
            <NewProject />
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
    dataSource={data}
    renderItem={(item) => (
      <ProjectsCard item={item} />
    )}
  />
        </Col>
    </Row>
    </>
  )
}

export default ProjectsArea