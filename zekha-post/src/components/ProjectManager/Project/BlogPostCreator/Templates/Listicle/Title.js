import React, {useState} from 'react';
import {useImmer} from 'use-immer';
import {Form, InputNumber, Row, Col, Slider, Input, Space, Upload,Button, Divider} from 'antd';
import { UploadOutlined,  } from '@ant-design/icons';
import ImageUpload from '../ImageUpload';
import AiAssist from '../../../AiAssist';



const Title = ({uid, state, stepper}) => {
  const [step, setStep] = stepper;
  const [template, setTemplate] = state;
  const [isTitleError, setIsTitleError] = useState('');
  const [titleVal, setTitleVal] = useState('');
  const [isImageError, setIsImageError] = useState('');
  const [imageVal, setImageVal] = useState('');
  
  const {title, heroImage} = template;

  const handleUpdate = (event, eventType) => {
    if (eventType === 'topic') {
      setIsTitleError('');
      setTitleVal('');
      setTemplate(draft => {draft.title.topic = event});
  }
    else if (eventType === 'heroImage') {
      setIsImageError('');
      setImageVal('');
      setTemplate(draft => {draft.heroImage = event});
    }
  };
  const onChange = ({ file, fileList }) => {
   console.log(file)
  };

  const validate = () => {
    
    if(title.topic.length < 1 || heroImage.length < 1) {
      if(title.topic.length < 1) {
        setIsTitleError('error'); 
        setTitleVal('Title is required!')
      }
      if(heroImage.length < 1) {
        setIsImageError('error'); 
        setImageVal('Feature Image is required!')
      }
      
      return;
    }
     setStep(1)
  };
 

  return (
    <>
    <Row justify='center'><Button size="large" onClick={validate} type="primary">Next</Button></Row>
      <Divider />
        <Input.Group>
        
            <Form.Item 
              validateStatus={isTitleError}
              help= {titleVal}
              label="Title"
              >
                <Row gutter={20}>
                 
                  <Col span={24}>
                  <Input value={title.topic} onChange={(e) => {handleUpdate(e.target.value, "topic")}}/></Col>
  
                </Row>        
            </Form.Item>
              <Row justify='center'><AiAssist handleUpdate={handleUpdate} templateEvent={'topic'}/></Row>
            <Form.Item
            label="Feature Image"
            validateStatus={isImageError}
            help= {imageVal}
            >
            <ImageUpload handleUpdate={handleUpdate} uid={uid} />
            </Form.Item>
        
        
        </Input.Group>
    </>
 
    

  )
}

export default Title;