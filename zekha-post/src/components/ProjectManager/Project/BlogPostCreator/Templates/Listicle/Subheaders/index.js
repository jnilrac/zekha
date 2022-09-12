import React, {useState, useEffect} from 'react'
import {Form, InputNumber, Row, Col, Slider, Input, Space, Divider, Button} from 'antd';
import {useImmer} from 'use-immer';
import Subheading from './Subheading';

const Subheaders = (props) => {
  const [template, setTemplate] = props.state;
  const {listQuantity} = template;
  const [subArray, setSubArray] = useImmer([]);


 

  const addSubheadings = () => {
        setTemplate((draft) => {
            draft.listQuantity = listQuantity + 1;
        })
        setSubArray((draft) =>{
            draft.push({
                id: listQuantity,
                element:<Subheading key={listQuantity} event={listQuantity} subs={[subArray, setSubArray]} state={[template, setTemplate]} />
            })
        })
    

  }



  const Subheadings = () => {
    console.log(subArray)
   return subArray.map(sub => {
    return(sub.element)
   })
  
  }


  return (
    <>
      
                <Form.Item>
                    <Row gutter={20}>
                        
                        <Col>
                            <Button onClick={addSubheadings}> Add Subheadings</Button>
                        </Col>
                    </Row>
            </Form.Item>
                    
       <Subheadings />
        
    </>
 
    

  )
}

export default Subheaders;