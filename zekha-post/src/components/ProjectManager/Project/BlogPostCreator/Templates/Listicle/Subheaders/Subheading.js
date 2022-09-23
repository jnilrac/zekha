import React, {useState, useRef, useEffect} from 'react'
import {useImmer} from 'use-immer';
import {Form, InputNumber, Row, Col, Slider, Input, Space, Button, Divider} from 'antd';
import ImageUpload from '../../ImageUpload';
import AiAssist from '../../../../AiAssist';
const { TextArea } = Input;



const Subheading = ({templateState, state}) => {
    
    const [subData, setSubData] = useState({});
    const [data, setData] = state;
    const [template, setTemplate ] = templateState;
   
    const {subheadingImage,subheadingTitle,clearBenefit, actionItems} = subData;

   
    
   const getSubData = (value, eventType) => {
    if(eventType === "heroImage") {
        setSubData(subData => ({...subData, subheadingImage:value}));
    }
    else if(eventType === "subheadingTitle") {
        setSubData(subData => ({...subData, subheadingTitle:value}));
        
    }
    else if(eventType === "clearBenefit") {
        setSubData(subData => ({...subData, clearBenefit:value}));
   }
   else if(eventType === "actionItems") {
    setSubData(subData => ({...subData, actionItems:value}));
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
        console.log(data);
        setTemplate((draft) =>{
            draft.subheadings = data;
        })
        setSubData({});
  }

  useEffect(()=>{
    setTemplate((draft) =>{
        draft.subheadings = data;
    })
  },[template])

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
                <ImageUpload handleUpdate={getSubData} />
            </Form.Item>
            <Form.Item
                label="Subheading Title"
                >
                    <Row gutter={10}>
                        <Col span={24}>
                            <Input value={subheadingTitle} onChange={(e) => {getSubData(e.target.value, "subheadingTitle")}}/>
                        </Col>
                        <Col style={{marginTop: 10}} span={24}>
                        
                        </Col>
                    </Row>
                    
            </Form.Item>
            <Row justify='center'><AiAssist handleUpdate={getSubData} templateEvent={'subheadingTitle'}/></Row>
            <Form.Item
                label="Subheading Clear Benefit"
                >
                    <Row><Col span={24}><Input.TextArea rows={4} value={clearBenefit} onChange={(e) => {getSubData(e.target.value, "clearBenefit")}}/></Col></Row>
                    
            </Form.Item>
            <Row justify='center'><AiAssist handleUpdate={getSubData} templateEvent={'clearBenefit'}/></Row>
            <Form.Item
                label="Action items"
                >
                    <Row><Col span={24}><Input.TextArea rows={4} value={actionItems} onChange={(e) => {getSubData(e.target.value, "actionItems")}}/></Col></Row>
                    
            </Form.Item>
            <Row style={{marginBottom:"20px"}} justify='center'><AiAssist handleUpdate={getSubData} templateEvent={'actionItems'}/></Row>
        
     
       <DisableButton />
    </div>
  ) 
}


export default Subheading