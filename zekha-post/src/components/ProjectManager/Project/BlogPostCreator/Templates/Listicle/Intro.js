import React, {useState, useEffect} from 'react'
import {Form, InputNumber, Row, Col, Slider, Input, Space, Button, Divider} from 'antd';
import AiAssist from '../../../AiAssist';
const Intro = ({state, stepper}) => {
  const [step, setStep] = stepper;
  const [template, setTemplate] = state;
  const [isProblemError, setIsProblemError] = useState('');
  const [problemVal, setProblemVal] = useState('');
  const [isBenefitError, setIsBenefitError] = useState('');
  const [benefitVal, setBenefitVal] = useState('');
  

  const handleUpdate = (event, eventType) => {
    if (eventType === 'problem') {
      setIsProblemError('');
      setProblemVal('')
      setTemplate(draft => {draft.intro.problem = event})
    }
    else if (eventType === 'introBenefit') { 
      setIsBenefitError('');
      setBenefitVal('');
      setTemplate(draft => {draft.intro.introBenefit = event})
  }

  };
  const validate = () => {
    
    if(template.intro.problem < 1 || template.intro.introBenefit < 1) {
      if(template.intro.problem < 1) {
        setIsProblemError('error'); 
        setProblemVal('Intro Problem is required!')
      }
      if(template.intro.introBenefit < 1) {
        setIsBenefitError('error'); 
        setBenefitVal('Intro Benefit is required!')
      }
      
      return;
    }
     setStep(2)
  };

  return (
    <>
      <Row justify='center'> <Space>
        <Col ><Button size="large" onClick={() =>{setStep(0)}} type="primary">Prev</Button></Col>
        <Col ><Button size="large" onClick={validate} type="primary">Next</Button></Col>
      </Space>
      </Row>
      <Divider />
        <Input.Group>
            
            <Form.Item
                label="Intro Problem"
                help={problemVal}
                validateStatus={isProblemError}
                >
                    <Input.TextArea rows={4} value={template.intro.problem} onChange={(e) => { handleUpdate(e.target.value, 'problem')}}/>
            </Form.Item>
            <Row justify='center'><AiAssist handleUpdate={handleUpdate} templateEvent={'problem'}/></Row>
            
            <Form.Item
                label="Intro Benefit"
                help={benefitVal}
                validateStatus={isBenefitError}
                >
                    <Input.TextArea  rows={4} value={template.intro.introBenefit} onChange={(e) => { handleUpdate(e.target.value, 'introBenefit')}}/>
            </Form.Item>
            <Row justify='center'><AiAssist handleUpdate={handleUpdate} templateEvent={'introBenefit'}/></Row>
        
        </Input.Group>
    </>
    

  )
}

export default Intro