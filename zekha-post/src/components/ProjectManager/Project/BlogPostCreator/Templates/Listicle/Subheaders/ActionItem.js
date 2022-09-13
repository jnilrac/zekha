import React, {useState, useRef} from 'react'
import {Form, InputNumber, Row, Col, Slider, Input, Space, Button, Divider} from 'antd';


const { TextArea } = Input;



const ActionItem = ({state, event, subs}) => {
    const imageRef = useRef(null);
    const titleRef = useRef(null);
    const clearBenefitRef = useRef(null);
    const [template, setTemplate] = state;
    const [subArray, setSubArray] = subs;
    console.log(event)
    
   

    const addImages = () => {
        
        const value = imageRef.current.input.value;
        setTemplate((draft) => {
            draft.subheadings.actionItems.push(value)
        })
       
  }

  const deleteSubheading = () => {
    setSubArray((draft) =>{
        const index = draft.findIndex(subheading => subheading.id === event)
        console.log(index)
       if (index !== -1) draft.splice(index, 1)
    });
  }



  return (
    <div>
        <Input.Group style={{border:"2px solid #1DA57A", padding:"30px", borderRadius:"10px", marginBottom: "30px"}}>
            
            <Form.Item
                label="Subheading Image"
                >
                    <Row><Col span={24}><Input ref={imageRef}/></Col></Row>
                    
            </Form.Item>
            <Form.Item
                label="Subheading Title"
                >
                    <Row><Col span={24}><Input ref={titleRef}/></Col></Row>
                    
            </Form.Item>
            <Form.Item
                label="Subheading Clear Benefit"
                >
                    <Row><Col span={24}><Input.TextArea rows={4} ref={clearBenefitRef}/></Col></Row>
                    
            </Form.Item>
            <Form.Item>
            <Row justify='center'>
                <Button type="danger" onClick={deleteSubheading}>Delete Subheading</Button>
            </Row>
                
            </Form.Item>

        
        
        </Input.Group>
    </div>
  )
}

export default ActionItem;