import React, {useState, useEffect} from 'react'
import {Form, InputNumber, Row, Col, Slider, Input, Space, Divider, Button} from 'antd';
import {useImmer} from 'use-immer';
import AiAssist from '../../../AiAssist';
import SectionEditor from './SectionEditor';

const Conclusion = ({state, stepper}) => {
  const [template, setTemplate] = state;
  const [step, setStep] = stepper;
  const [isConclusionError, setIsConclusionError] = useState('');
  const [conclusionVal, setConclusionVal] = useState('');
  const [quillText, setQuillText] = useImmer({});
 
  const handleUpdate = (event, eventType) => {
    setConclusionVal('');
    setIsConclusionError('');
    setTemplate(draft => {draft.conclusion = event});
  };

  const validate = () => {
    
    if(quillText.conclusion === '\n') {
      setIsConclusionError('error'); 
      setConclusionVal('Conclusion is required!')
      return;
    }
     setStep(4)
  };

  return (
    <>
       <Row justify='center'> 
        <Space>
          <Col ><Button size="large" onClick={() =>{setStep(2)}} type="primary">Prev</Button></Col>
          <Col ><Button size="large" onClick={validate} type="primary">Next</Button></Col>
        </Space>
    </Row>
    <Divider />
        <Input.Group>
            
            <Form.Item
                label="Conclusions"
                help={conclusionVal}
                validateStatus={isConclusionError}
                >
                    <SectionEditor section={'conclusion'} text={[quillText, setQuillText]} value={template.conclusion} onChange={(e) => { handleUpdate(e, 'conclusion')}}/>
            </Form.Item>
    
        </Input.Group>
        <Row  justify='center'><AiAssist handleUpdate={handleUpdate} templateEvent={'conclusion'}/></Row>
    </>
    

  )
}

export default Conclusion