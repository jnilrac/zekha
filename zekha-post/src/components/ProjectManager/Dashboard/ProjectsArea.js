import React from 'react'
import { Col, Row, Divider, List } from 'antd';
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
    <Row justify='center'>
        <Col><h1>Projects</h1></Col>
    </Row>
    <Row justify='center'>
        <Col span={24} style={{backgroundColor: "#1DA57A", borderRadius:"10px", opacity:"0.5", padding:"20px", overflowY:"scroll", height:"80vh"}}>
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