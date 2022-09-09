import React from 'react'
import { Tabs, Row, Col } from 'antd';
import BlogPostArticles from './BlogPostArticles';
import BlogPostCreator from './BlogPostCreator';
import ImageManager from './ImageManager';
import {Link} from 'react-router-dom'

const onChange = (key) => {
  console.log(key);
};

const Project = () => {
  return (
    <>
    <Row style={{margin:"10px"}}><Link to="/app/dashboard"><h3>Back to Dashboard</h3></Link></Row>
    <Row justify='center'><h1>Project Name</h1></Row>
    <Row justify='center'>
      <Col style={{height:"95vh", backgroundColor:"white", padding:20, borderRadius:20}} span={24}>
      <Tabs
      style={{ height:"100%", overflow:"hidden"}}
    defaultActiveKey="1"
    onChange={onChange}
    items={[
      {
        label: `Creator`,
        key: '1',
        children: <BlogPostCreator />,
      },
      {
        label: `Project Posts`,
        key: '2',
        children: <BlogPostArticles />,
      },
      {
        label: `Image Manager`,
        key: '3',
        children: <ImageManager />,
      },
    
    ]}
  />
      </Col>
    </Row>
    </>
    
    
  )
}

export default Project