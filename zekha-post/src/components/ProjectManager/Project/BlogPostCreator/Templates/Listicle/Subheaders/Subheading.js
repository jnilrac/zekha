import React, {useState, useRef} from 'react'
import {Form, InputNumber, Row, Col, Slider, Input, Space, Button, Divider} from 'antd';


const { TextArea } = Input;



const Subheading = ({state, event, subs}) => {
    const imageRef = useRef(null);
    const [template, setTemplate] = state;
    const [subArray, setSubArray] = subs;
    console.log(event)
    
   

    const addImages = () => {
        
        const value = imageRef.current.input.value;
        setTemplate((draft) => {
            draft.subheadings.push({subheadinImages:value})
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
    <Row><h3>Subheading #{event + 1}</h3></Row>
    <Divider />
    <Input.Group>
        
        <Form.Item
            label="Subheading Image"
            >
                <Input ref={imageRef}/>
                <Button onClick={addImages} type="primary">Submit</Button>
        </Form.Item>
        <Form.Item>
            <Button onClick={deleteSubheading}>Delete Subheading</Button>
        </Form.Item>

       
    
    </Input.Group>
    </div>
  )
}

export default Subheading