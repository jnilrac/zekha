import React, {useState, useRef, useEffect} from 'react'
import {useImmer} from 'use-immer';
import {Form, InputNumber, Row, Col, Slider, Input, Space, Button, Divider} from 'antd';
import ImageUpload from '../../ImageUpload';
import AiAssist from '../../../../AiAssist';
import SectionEditor from '../SectionEditor';

const { TextArea } = Input;



const EditSubheading = ({uid,templateState ,state, formShow}) => {
    const [quillText, setQuillText] = useImmer({});
    const [hideUpload, setHideUpload] = useState(false);
    const [showEditForm, setShowEditForm] = formShow;
    const [template, setTemplate ] = templateState;
    const [data, setData] = state;
    const {record} = showEditForm;
    const [subData, setSubData] = useState(record);
    const {subheadingImage,subheadingTitle,clearBenefit, actionItems, subheadingImageRef} = subData;
   



    
   const getSubData = (value, eventType) => {
    if(eventType === "heroImage") {
        setSubData(subData => ({...subData, subheadingImage:value.url, subheadingImageRef:value.ref}));
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
   }
    const editSubheading = () => {
        const index = data.indexOf(record);
        const newArray = [...data];
        newArray.splice(index, 1, subData);
        setData(newArray)
        
        setTemplate((draft) =>{
            draft.subheadings = data;
        })
        setSubData({});

        setShowEditForm((showEditForm) => ({...showEditForm, show:false}))
       
    }

    useEffect(()=>{
        setTemplate((draft) =>{
            draft.subheadings = data;
        })
      },[template])
    
    const cancelEdit = () => {
        setShowEditForm((showEditForm) => ({...showEditForm, show:false}))
    }



    const DisableButton = () => {
        if(
            subheadingImage.length < 1 || 
            subheadingTitle.length < 1 || 
            clearBenefit.length < 1 || 
            actionItems.length < 1 
             ){
            return (
                <Row justify='center'>
                <Space>
                <Button type="primary" disabled={true} onClick={editSubheading}>Edit Subheading</Button>
                <Button type="danger" onClick={cancelEdit}>Cancel</Button>
                </Space>
                
            </Row>
            );
        } else {
            return (
                <Row justify='center'>
                <Space>
                <Button type="primary" onClick={editSubheading}>Edit Subheading</Button>
                <Button type="danger" onClick={cancelEdit}>Cancel</Button>
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
                <ImageUpload oldRef={subheadingImageRef} uid={uid} handleUpdate={getSubData} />
            </Form.Item>

            <Form.Item
                label="Subheading Title"
                >
                     <Row gutter={10}>
                        <Col span={24}>
                            <Input value={subheadingTitle} onChange={(e) => {getSubData(e.target.value, "subheadingTitle")}}/>
                        </Col>
                       
                    </Row>
                    
            </Form.Item>
            <Row justify='center'><AiAssist handleUpdate={getSubData} templateEvent={'subheadingTitle'}/></Row>
            <Form.Item
                label="Subheading Clear Benefit"
                >
                    <Row><Col span={24}><SectionEditor section={"clearBenefit"} text={[quillText, setQuillText]} value={clearBenefit} onChange={(e) => {getSubData(e, "clearBenefit")}}/></Col></Row>
                    
            </Form.Item>
            <Row justify='center'><AiAssist handleUpdate={getSubData} templateEvent={'clearBenefit'}/></Row>
            <Form.Item
                label="Action items"
                >
                    <Row><Col span={24}><SectionEditor section={"actionItems"} text={[quillText, setQuillText]} value={actionItems} onChange={(e) => {getSubData(e, "actionItems")}}/></Col></Row>
                    
            </Form.Item>
            <Row style={{marginBottom:"20px"}} justify='center'><AiAssist handleUpdate={getSubData} templateEvent={'actionItems'}/></Row>
        
     
      <DisableButton />
    </div>
  ) 
}


export default EditSubheading