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
  listQuantity: 0,
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

  const CyclePreviews = () => {
    return step === 0 ? 
    <>
    <Row justify='center'><Button size="large" onClick={() =>{setStep(1)}} type="primary">Next</Button></Row>
    <Divider />
    <Row justify='center'><h2>Title Preview:</h2></Row>
    <Row justify='center'><h1>{`${title.topic} ${title.benefit} ${title.timePeriod}`}</h1></Row>
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
    <Row justify='center'><h1>{`${intro.problem} ${intro.introBenefit}`}</h1></Row>
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
    <Row justify='center'><h2>Intro Preview:</h2></Row>
    <Row justify='center'><h1>Test</h1></Row>
    <Row justify='center'>

    </Row>
    
    </>
    : null
  };

 
  return (
    <>
       <Steps current={step}>
          <Step title="Create Title" description="This is a description." />
          <Step title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
          <Step title="Waiting" description="This is a description." />
          <Step title="Still Waiting" description="This is a description." />
          <Step title="Still Waiting" description="This is a description." />
        </Steps>
        
       <Row  justify='center'>
      <Col span={8}>
        <Form layout="vertical" >
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