import React, {useState, useRef, useEffect} from 'react'
import {useImmer} from 'use-immer';
import {Form, InputNumber, Row, Col, Slider, Input, Space, Button, Divider} from 'antd';

const { TextArea } = Input;



const Subheading = ({templateState, state}) => {
  
    const [subData, setSubData] = useState({});
    const [data, setData] = state;
    const [template, setTemplate ] = templateState;
   
    const {subheadingImage,subheadingTitle,clearBenefit} = subData;

   
    
   const getsubData = (value, eventType) => {
    if(eventType === "image") {
        setSubData(subData => ({...subData, subheadingImage:value}));
    }
    else if(eventType === "title") {
        setSubData(subData => ({...subData, subheadingTitle:value}));
        
    }
    else if(eventType === "clearBenefit") {
        setSubData(subData => ({...subData, clearBenefit:value}));
   };
   if(data.length === 0) {
    setSubData(subData => ({...subData, key: 0})); 
   } else {
    const key = data.length;
    console.log(key)
    setSubData(subData => ({...subData, key: key})); 
   }
  
   }

    const createSubheading = () => {

        setData(data=> ([...data, subData]));
        setSubData({});
  }

  const DisableButton = () => {
    if(!subheadingImage || !subheadingTitle || !clearBenefit){
        return (
            <Row justify='center'>
            <Space>
            <Button type="primary" disabled={true} onClick={createSubheading}>Create Subheading</Button>
            </Space>
            
        </Row>
        );
    } else {
        return (
            <Row justify='center'>
            <Space>
            <Button type="primary" onClick={createSubheading}>Create Subheading</Button>
            </Space>
            
        </Row>
        );
    }
  }


  return (
    <div style={{border:"2px solid #1DA57A", padding:"30px", borderRadius:"10px", marginBottom: "30px"}}>
       
            
            <Form.Item
                label="Subheading Image"
                >
                    <Row><Col span={24}><Input value={subData.subheadingImage} onChange={(e) => {getsubData(e.target.value, "image")}} /></Col></Row>
                    
            </Form.Item>
            <Form.Item
                label="Subheading Title"
                >
                    <Row><Col span={24}><Input value={subData.subheadingTitle} onChange={(e) => {getsubData(e.target.value, "title")}}/></Col></Row>
                    
            </Form.Item>
            <Form.Item
                label="Subheading Clear Benefit"
                >
                    <Row><Col span={24}><Input.TextArea rows={4} value={subData.clearBenefit} onChange={(e) => {getsubData(e.target.value, "clearBenefit")}}/></Col></Row>
                    
            </Form.Item>
        
     
       <DisableButton />
    </div>
  ) 
}


export default Subheading