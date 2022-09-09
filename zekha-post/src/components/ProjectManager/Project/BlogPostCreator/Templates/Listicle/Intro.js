import React, {useState, useEffect} from 'react'
import {Form, InputNumber, Row, Col, Slider, Input, Space} from 'antd';

const Intro = (props) => {
  const [template, setTemplate] = props.state;
  const [inputValue, setInputValue] = useState(1);
  const {title} = template;



  return (
    <>
        <Input.Group>
            
            <Form.Item
                label="Problem"
                name="problem"
                >
                    <Input onChange={(e) => setTemplate(template => ({...template, intro: {...template.intro, problem:e.target.value}}))}/>
            </Form.Item>

            <Form.Item
                label="Intro Benefit"
                name="introBenefit"
                >
                    <Input onChange={(e) => setTemplate(template => ({...template, intro: {...template.intro, introBenefit:e.target.value}}))}/>
            </Form.Item>
        
        
        </Input.Group>
    </>
    

  )
}

export default Intro