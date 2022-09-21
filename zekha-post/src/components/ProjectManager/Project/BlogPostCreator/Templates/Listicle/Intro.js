import React, {useState, useEffect} from 'react'
import {Form, InputNumber, Row, Col, Slider, Input, Space} from 'antd';
import AiAssist from '../../../AiAssist';
const Intro = (props) => {
  const [template, setTemplate] = props.state;
  const [inputValue, setInputValue] = useState(1);
  const {title} = template;

  const handleUpdate = (event, eventType) => {
    if (eventType === 'problem') setTemplate(draft => {draft.intro.problem = event})
    else if (eventType === 'introBenefit') setTemplate(draft => {draft.intro.introBenefit = event})

  };

  return (
    <>
        <Input.Group>
            
            <Form.Item
                label="Intro Problem"
                >
                    <Input.TextArea rows={4} value={template.intro.problem} onChange={(e) => { handleUpdate(e.target.value, 'problem')}}/>
            </Form.Item>
            <Row justify='center'><AiAssist handleUpdate={handleUpdate} templateEvent={'problem'}/></Row>
            
            <Form.Item
                label="Intro Benefit"
                >
                    <Input.TextArea  rows={4} value={template.intro.introBenefit} onChange={(e) => { handleUpdate(e.target.value, 'introBenefit')}}/>
            </Form.Item>
            <Row justify='center'><AiAssist handleUpdate={handleUpdate} templateEvent={'introBenefit'}/></Row>
        
        </Input.Group>
    </>
    

  )
}

export default Intro