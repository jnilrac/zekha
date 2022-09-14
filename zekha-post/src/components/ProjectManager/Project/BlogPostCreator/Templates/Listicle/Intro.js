import React, {useState, useEffect} from 'react'
import {Form, InputNumber, Row, Col, Slider, Input, Space} from 'antd';

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
                name="problem"
                >
                    <Input.TextArea rows={4} onChange={(e) => { handleUpdate(e.target.value, 'problem')}}/>
            </Form.Item>

            <Form.Item
                label="Intro Benefit"
                name="introBenefit"
                >
                    <Input.TextArea  rows={4} onChange={(e) => { handleUpdate(e.target.value, 'introBenefit')}}/>
            </Form.Item>
        
        
        </Input.Group>
    </>
    

  )
}

export default Intro