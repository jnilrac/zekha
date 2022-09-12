import React, {useCallback} from 'react';
import {useImmer} from 'use-immer';
import {Form, InputNumber, Row, Col, Slider, Input, Space} from 'antd';


const Title = (props) => {
  const [template, setTemplate] = props.state;
  
  const {title} = template;

  const handleUpdate = (event, eventType) => {
    if (eventType === 'topic') setTemplate(draft => {draft.title.topic = event})
    else if (eventType === 'benefit') setTemplate(draft => {draft.title.benefit = event})
    else if (eventType === 'timePeriod') setTemplate(draft => {draft.title.timePeriod = event})
    else if (eventType === 'heroImage') setTemplate(draft => {draft.title.heroImage = event})
  };

 

  return (
    <>
        <Input.Group>
        
            <Form.Item
                label="Topic"
                name="topic"
                >
                    <Input onChange={(e) => {handleUpdate(e.target.value, "topic")}}/>
            </Form.Item>

            <Form.Item
                label="Benefit"
                name="benefit"
                >
                    <Input onChange={(e) => {handleUpdate(e.target.value, "benefit")}}/>
            </Form.Item>

            <Form.Item
                label="Time Period"
                name="timePeriod"
                >
                    <Input onChange={(e) => {handleUpdate(e.target.value, "timePeriod")}}/>
            </Form.Item>
            <Form.Item
                label="Hero Image"
                name="heroImage"
                >
                    <Input onChange={(e) => {handleUpdate(e.target.value, "heroImage")}}/>
            </Form.Item>
        
        
        </Input.Group>
    </>
 
    

  )
}

export default Title;