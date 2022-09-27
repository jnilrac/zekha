import React, {useState, useEffect} from 'react'
import {Form, InputNumber, Row, Col, Slider, Input, Space, Divider, Button, message} from 'antd';
import {useImmer} from 'use-immer';
import Subheading from './Subheading';
import EditSubheading from './EditSubheading';
import SubheadingTable from './SubheadingTable';

const Subheaders = ({uid, tableData, state, stepper}) => { 
const [step, setStep ] = stepper;
const [data, setData] = tableData;
const [showEditForm, setShowEditForm] = useState({record:{}, show:false});
const [template, setTemplate ] = state;


const ShowForm = () => {
    if(!showEditForm.show){
        return <Subheading  uid={uid} templateState={[template, setTemplate ]} state={[data, setData]} />;
    }else {
        return <EditSubheading uid={uid} templateState={[template, setTemplate ]} formShow={[showEditForm, setShowEditForm]} state={[data, setData]}  />
    }
}

const checkSubheadings = () => {
  if(template.subheadings.length < 1) {
    message.error("Please create at least one subheading!")
    return;
  }
  setStep(3)
}

  return (
    <>          
       <Row justify='center'> 
      <Space>
          <Col ><Button size="large" onClick={() =>{setStep(1)}} type="primary">Prev</Button></Col>
          <Col ><Button size="large" onClick={checkSubheadings} type="primary">Next</Button></Col>
        </Space>
      </Row>
     <Divider />
       <ShowForm />
        <SubheadingTable templateState={[template, setTemplate ]} formShow={[showEditForm, setShowEditForm]} state={[data, setData]} />
        
    </>
 
    

  )
}

export default Subheaders;