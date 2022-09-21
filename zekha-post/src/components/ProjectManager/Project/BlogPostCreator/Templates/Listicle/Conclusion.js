import React, {useState, useEffect} from 'react'
import {Form, InputNumber, Row, Col, Slider, Input, Space} from 'antd';
import AiAssist from '../../../AiAssist';

const Conclusion = ({state}) => {
  const [template, setTemplate] = state;
 
  const handleUpdate = (event, eventType) => {
    setTemplate(draft => {draft.conclusion = event})
  
  };

  return (
    <>
        <Input.Group>
            
            <Form.Item
                label="Conclusion"
                >
                    <Input.TextArea rows={4} value={template.conclusion} onChange={(e) => { handleUpdate(e.target.value, 'conclusion')}}/>
            </Form.Item>
    
        </Input.Group>
        <Row  justify='center'><AiAssist handleUpdate={handleUpdate} templateEvent={'conclusion'}/></Row>
    </>
    

  )
}

export default Conclusion