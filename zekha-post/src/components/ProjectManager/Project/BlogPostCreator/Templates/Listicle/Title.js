import React, {useCallback} from 'react';
import {useImmer} from 'use-immer';
import {Form, InputNumber, Row, Col, Slider, Input, Space, Upload,Button} from 'antd';
import { UploadOutlined,  } from '@ant-design/icons';
import ImageUpload from '../ImageUpload';



const Title = ({uid, state}) => {
  
  const [template, setTemplate] = state;
  
  const {title, heroImage} = template;

  const handleUpdate = (event, eventType) => {
    if (eventType === 'topic') setTemplate(draft => {draft.title.topic = event})
    else if (eventType === 'heroImage') setTemplate(draft => {draft.heroImage = event})
  };
  const onChange = ({ file, fileList }) => {
   console.log(file)
  };

 

  return (
    <>
        <Input.Group>
        
            <Form.Item label="Title">
                    <Input value={title.topic} onChange={(e) => {handleUpdate(e.target.value, "topic")}}/>
            </Form.Item>

            <Form.Item
            label="Feature Image"
            >
            <ImageUpload handleUpdate={handleUpdate} uid={uid} />
            </Form.Item>
        
        
        </Input.Group>
    </>
 
    

  )
}

export default Title;