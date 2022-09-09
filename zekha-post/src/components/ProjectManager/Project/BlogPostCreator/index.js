import React, {useState} from 'react'
import { Col, Row, Divider, List } from 'antd';
import TemplateCard from './TemplateCard'
import Listicle from './Templates/Listicle'
import DetailedCaseStudy from './Templates/DetailedCaseStudy';
import HowTheyDidIt from './Templates/HowTheyDidIt';
import ProductShowdown from './Templates/ProductShowdown';
import TheBeginnersGuide from './Templates/TheBeginnersGuide';
import TheMythDebunker from './Templates/TheMythDebunker';
import ThingsToDoAfterX from './Templates/ThingsToDoAfterX';



const BlogPostCreator = () => {
  const [testState, setTestState ] = useState('123')
  console.log(testState)
  const data = [
    {
      title: 'Listicle',
      template: <Listicle state={[testState, setTestState]}/>,
      content: "A list of 10-25 bite-sized tips, strategies, techniques, tools… or anything else that makes sense for a list.",
    },
    {
      title: 'Detailed Case Study',
      template: <DetailedCaseStudy />,
      content: 'A case study is like a traditional how-to post… backed up with a real example.'
    },
    {
      title: 'Product Showdown',
      template: <ProductShowdown />,
      content: 'This post is a side-by-side comparison of two competing products.'
    },
    {
      title: 'Things To Do After X',
      template: <ThingsToDoAfterX />,
      content: 'A Things To Do After “X” post gives your readers a step-by-step game plan during a critical time.'
    },
    {
      title: "The Beginner’s Guide",
      template: <TheBeginnersGuide />,
      content: 'This template helps eliminate overwhelm by showing your readers the exact first steps to get started.'
    },
    {
      title: 'How They Did It ',
      template: <HowTheyDidIt />,
      content: 'This template shines a light on how successful people or groups achieved amazing results.'
    },
    {
      title: 'The Myth Debunker',
      template: <TheMythDebunker />,
      content:'This template creates controversy and gets people that agree (and disagree) with you to share your content.'
    },
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