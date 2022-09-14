import React, {useState, useEffect} from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, List, Card, Divider, Steps } from 'antd';
import {useImmer} from 'use-immer';
import Title from './Title';
import Intro from './Intro';
import Subheaders from './Subheaders';
const { Option } = Select;
const {Step} = Steps;

const listicleTemplate = {
  title:{
    topic: '',
    benefit: '',
    timePeriod:''
  },
  heroImage: '',
  intro: {
    problem:'',
    introBenefit: ''
  },
  subheadings:[
  ],
  conclusion: '',
  callToAction:''

}



const Listicle = (props) => {
 
  const [template, setTemplate] = useImmer(listicleTemplate );
  const [step, setStep] = useState(0)
  const {title, intro, subheadings, conclusion, callToAction} = template;
 console.log(template)
  const CycleSteps = () => {
    return step === 0 ? <Title state={[template, setTemplate]} /> 
    :step === 1 ? <Intro state={[template, setTemplate]} /> 
    : step === 2 ? <Subheaders state={[template, setTemplate]} /> 
    : null
  };

  const ShowSubheadings = () => {
    return template.subheadings.map((sub) =>{
      return <h1 key={sub.key}>{sub.subheadingTitle}</h1> 
    })
  };

  const CyclePreviews = () => {
    return step === 0 ? 
    <>
    <Row justify='center'><Button size="large" onClick={() =>{setStep(1)}} type="primary">Next</Button></Row>
    <Divider />
    <Row justify='center'><h2>Title Preview:</h2></Row>
    <Row justify='center'><h1>{`${title.topic}`}</h1></Row>
    <Row style={{margintTop:"200px"}} justify='center'><img style={{width:'750px', margin:"20px"}}src={`${title.heroImage}`} /></Row>
    
    </>
    :step === 1 ? 
    <>
    <Row justify='center'> <Space>
        <Col ><Button size="large" onClick={() =>{setStep(0)}} type="primary">Prev</Button></Col>
        <Col ><Button size="large" onClick={() =>{setStep(2)}} type="primary">Next</Button></Col>
      </Space></Row>
     <Divider />
    <Row justify='center'><h2>Intro Preview:</h2></Row>
    <Row justify='center'><h1>{`${intro.problem}`}</h1></Row>
    <Row justify='center'><h1>{`${intro.introBenefit}`}</h1></Row>
    <Row justify='center'>

    </Row>
    
    </>
    :step === 2 ? 
    <>
    <Row justify='center'> <Space>
        <Col ><Button size="large" onClick={() =>{setStep(1)}} type="primary">Prev</Button></Col>
        <Col ><Button size="large" onClick={() =>{setStep(3)}} type="primary">Next</Button></Col>
      </Space></Row>
     <Divider />
    <Row justify='center'><h2>Subheading Preview:</h2></Row>
    <Row justify='center'><ShowSubheadings /></Row>
    <Row justify='center'>

    </Row>
    
    </>
    : null
  };

   
 
  return (
    <>
       <Steps current={step}>
          <Step title="Create Post Title" description="Piece together your title by filling out the fields." />
          <Step title="Create Post Intro"  description="Create your post introdution here." />
          <Step title="Subheaders" description="Add as many subheaders as you need for your list." />
          <Step title="Still Waiting" description="This is a description." />
          <Step title="Still Waiting" description="This is a description." />
        </Steps>
        <Divider />
       <Row  justify='center'>
      <Col span={16}>
        <Form  layout="vertical" >
          {CycleSteps}
          
        </Form>
      </Col>
     
    </Row>
    <Divider />
  
    <CyclePreviews />
    
    </>
 
  )
}

export default Listicle