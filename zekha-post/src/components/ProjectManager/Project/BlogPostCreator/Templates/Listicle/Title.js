import React, {useState, useEffect} from 'react'
import {Form, InputNumber, Row, Col, Slider, Input, Space} from 'antd';

const Title = (props) => {
  const [template, setTemplate] = props.state;
  const [inputValue, setInputValue] = useState(1);
  const {title} = template;



  return (
    <>
      
                <Form.Item
                label='List Item Quantity:'
                name='listQuantity'
                >
                    <Row>
                        <Col span={6}>
                            <Slider
                            min={1}
                            max={20}
                            onChange={(e) => setTemplate(template => ({...template, title: {...template.title, listQuantity:e}}))}
                            value={template.title.listQuantity}
                            />
                    
                        </Col>
                        <Col span={6}>
                            <InputNumber
                            disabled={true}
                            min={1}
                            max={20}
                            style={{
                                margin: '0 16px',
                            }}
                            value={template.title.listQuantity}
                            onChange={(e) => setTemplate(template => ({...template, title: {...template.title, listQuantity:e}}))}
                            />
                        </Col>
                    </Row>
            </Form.Item>

       
        <Input.Group>
        
            <Form.Item
                label="Topic"
                name="topic"
                >
                    <Input onChange={(e) => setTemplate(template => ({...template, title: {...template.title, topic:e.target.value}}))}/>
            </Form.Item>

            <Form.Item
                label="Benefit"
                name="benefit"
                >
                    <Input onChange={(e) => setTemplate(template => ({...template, title: {...template.title, benefit:e.target.value}}))}/>
            </Form.Item>

            <Form.Item
                label="Time Period"
                name="timePeriod"
                >
                    <Input onChange={(e) => setTemplate(template => ({...template, title: {...template.title, timePeriod:e.target.value}}))}/>
            </Form.Item>
        
        
        </Input.Group>
    </>
 
    

  )
}

export default Title;