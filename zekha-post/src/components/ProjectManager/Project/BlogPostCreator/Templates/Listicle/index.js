import React, {useState, useEffect} from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, List, Card, Divider, Steps } from 'antd';
import {useImmer} from 'use-immer';
import Title from './Title';
import Intro from './Intro';
import Subheaders from './Subheaders';
import Conclusion from './Conclusion';
import Editor from '../../Editor';

const {Step} = Steps;

const listicleTemplate = {
  title:{
    topic: ''
  },
  heroImage: '',
  intro: {
    problem:'',
    introBenefit: ''
  },
  subheadings:[
  ],
  conclusion: ''

}



const Listicle = (props) => {
 
  const [template, setTemplate] = useImmer(listicleTemplate );
  const [step, setStep] = useState(0)
  const {title, intro, subheadings, conclusion} = template;
  const [data, setData] = useState([])
 console.log(template)
  const CycleSteps = () => {
    return step === 0 ? <Title state={[template, setTemplate]} /> 
    :step === 1 ? <Intro state={[template, setTemplate]} /> 
    : step === 2 ? <Subheaders tableData={[data, setData] } state={[template, setTemplate]} /> 
    : step === 3 ? <Conclusion state={[template, setTemplate]} /> 
    : step === 4 ? <Editor state={[template, setTemplate]} /> 
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
    :step === 3 ? 
    <>
    <Row justify='center'> <Space>
        <Col ><Button size="large" onClick={() =>{setStep(2)}} type="primary">Prev</Button></Col>
        <Col ><Button size="large" onClick={() =>{setStep(4)}} type="primary">Next</Button></Col>
      </Space></Row>
     <Divider />
    <Row justify='center'><h2>Conslusion Preview:</h2></Row>
    <Row justify='center'>{`${conclusion}`}</Row>
    <Row justify='center'>

    </Row>
    
    </>
    :step === 4 ? 
    <>
    <Row justify='center'> <Space>
        <Col ><Button size="large" onClick={() =>{setStep(3)}} type="primary">Prev</Button></Col>
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
          <Step title="Conclusion" description="Write a conclusion with a call to action at the end." />
          <Step title="Finalize in Text Editor" description="Finish your post by adding rich text." />
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