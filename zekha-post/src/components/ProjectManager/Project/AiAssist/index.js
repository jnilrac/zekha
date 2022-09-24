import { Button, Form, Row, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import AiAssistListicle from './AiAssistListicle/index.js';
import { useImmer } from 'use-immer';

const AiAssist = ({handleUpdate, templateEvent}) => {
  const [assister, setAssister] =  useState(false)

  

  const ShowAssist = () => {
    if(assister){
      return <AiAssistListicle update={handleUpdate} assistShow={[assister, setAssister]}  templateEvent={templateEvent}/>;
    }
  }



  return(
    <>
    <Row><Button onClick={() => {setAssister(!assister)}}>Ai Assist</Button></Row>
    <Divider />
    <Row><ShowAssist /></Row>
    <Divider />
      
    </>
    
    
  )
};

export default AiAssist;