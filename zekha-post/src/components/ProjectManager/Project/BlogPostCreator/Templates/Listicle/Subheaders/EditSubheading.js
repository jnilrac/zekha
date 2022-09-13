import React, {useState, useRef, useEffect} from 'react'
import {useImmer} from 'use-immer';
import {Form, InputNumber, Row, Col, Slider, Input, Space, Button, Divider} from 'antd';

const { TextArea } = Input;



const EditSubheading = ({state, formShow}) => {
  
    const [subData, setSubData] = useState({});
    const [showEditForm, setShowEditForm] = formShow;
   
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
   }
    const editSubheading = () => {
        
        setShowEditForm(false);
       
    }
    
    const cancelEdit = () => {
        setShowEditForm(false);
    }






  return (
    <div style={{border:"2px solid #1DA57A", padding:"30px", borderRadius:"10px", marginBottom: "30px"}}>
       
            
            <Form.Item
                label="Subheading Image"
                >
                    <Row><Col span={24}><Input  onChange={(e) => {getsubData(e.target.value, "image")}} /></Col></Row>
                    
            </Form.Item>
            <Form.Item
                label="Subheading Title"
                >
                    <Row><Col span={24}><Input  onChange={(e) => {getsubData(e.target.value, "title")}}/></Col></Row>
                    
            </Form.Item>
            <Form.Item
                label="Subheading Clear Benefit"
                >
                    <Row><Col span={24}><Input.TextArea rows={4} onChange={(e) => {getsubData(e.target.value, "clearBenefit")}}/></Col></Row>
                    
            </Form.Item>
        
     
        <Row justify='center'>
                <Space>
                <Button type="primary" onClick={editSubheading}>Edit Subheading</Button>
                <Button type="danger" onClick={cancelEdit}>Cancel</Button>
                </Space>
                
            </Row>
    </div>
  ) 
}


export default EditSubheading