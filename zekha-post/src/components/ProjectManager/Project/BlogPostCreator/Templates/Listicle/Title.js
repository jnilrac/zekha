import React, {useCallback} from 'react';
import {useImmer} from 'use-immer';
import {Form, InputNumber, Row, Col, Slider, Input, Space} from 'antd';


const Title = (props) => {
  const [template, setTemplate] = props.state;
  
  const {title, heroImage} = template;

  const handleUpdate = (event, eventType) => {
    if (eventType === 'topic') setTemplate(draft => {draft.title.topic = event})
    else if (eventType === 'heroImage') setTemplate(draft => {draft.heroImage = event})
  };

 

  return (
    <>
        <Input.Group>
        
            <Form.Item label="Title">
                    <Input value={title.topic} onChange={(e) => {handleUpdate(e.target.value, "topic")}}/>
            </Form.Item>

            <Form.Item label="Hero Image" >
                    <Input value={heroImage} onChange={(e) => {handleUpdate(e.target.value, "heroImage")}}/>
            </Form.Item>
        
        
        </Input.Group>
    </>
 
    

  )
}

export default Title;