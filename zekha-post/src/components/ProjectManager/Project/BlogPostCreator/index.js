import React, {useState} from 'react'
import { Col, Row, Divider, List } from 'antd';
import TemplateCard from './TemplateCard'
import Listicle from './Templates/Listicle'




const BlogPostCreator = () => {
  const [testState, setTestState ] = useState('123')
  console.log(testState)
  const data = [
    {
      title: 'Listicle',
      template: <Listicle state={[testState, setTestState]}/>,
      content: "A list of 10-25 bite-sized tips, strategies, techniques, tools… or anything else that makes sense for a list.",
    }
  ];

  return (
    <>
    
    <Row justify='center'>
        <Col><h1>Post Templates</h1></Col>
    </Row>
    <Row justify='center'>
        <Col><h3>Pick a template for your post.</h3></Col>
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
      <TemplateCard item={item} content={item.content} />
    )}
  />
        </Col>
    </Row>
   
    </>
  )
}

export default BlogPostCreator