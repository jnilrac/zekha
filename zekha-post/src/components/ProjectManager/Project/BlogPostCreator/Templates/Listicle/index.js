import React, {useState, useEffect} from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, List, Card, Divider, Steps, Modal } from 'antd';
import {useImmer} from 'use-immer';
import parse from 'html-react-parser';
import Title from './Title';
import Intro from './Intro';
import Subheaders from './Subheaders';
import Conclusion from './Conclusion';
import Editor from '../../Editor';

const {Step} = Steps;




const Listicle = ({post,curTemp, curProj, uid, submitButton}) => {
  const [currentProject, setCurrentProject] = curProj;
  const [template, setTemplate] = curTemp;
  const [finalPost, setFinalPost] = post;

  const [step, setStep] = useState(0)
  const {title,heroImage, intro, subheadings, conclusion} = template;
  const [data, setData] = useState([])
 console.log(template)

  const CycleSteps = () => {
    return step === 0 ? <Title uid={uid} stepper={[step, setStep]} state={[template, setTemplate]} /> 
    :step === 1 ? <Intro stepper={[step, setStep]} state={[template, setTemplate]} /> 
    : step === 2 ? <Subheaders stepper={[step, setStep]} uid={uid} tableData={[data, setData] } state={[template, setTemplate]} /> 
    : step === 3 ? <Conclusion  stepper={[step, setStep]} state={[template, setTemplate]} /> 
    : step === 4 ? <Editor submitButton={submitButton} stepper={[step, setStep]} post={[finalPost, setFinalPost]} state={[template, setTemplate]} /> 
    : null
  };

  const ShowSubheadings = () => {
    return template.subheadings.map((sub) =>{
      return (
      
          <>
           <Row justify='center'>
             <h3 key={sub.key}>{sub.subheadingTitle}</h3> 
           </Row>
           <Row justify='center'>
            <img style={{maxWidth:400, margin:50}} alt="" src={sub.subheadingImage} />
           </Row>
           <Row>
           
             <span>{ parse(sub.clearBenefit + sub.actionItems)}</span>
          
            
           
           </Row>         
          </>
       
        
      
      )
    })
  };

  const CyclePreviews = () => {
    const [open, setOpen] = useState(false);

    const showImage = () => {
      if(heroImage.url){
        return <img alt="" style={{maxWidth:'600px', margin:"20px"}}src={`${heroImage.url}`} />;
      } 
    }

  
    return step === 0 ? 
    <Row justify='center'>
      <Button type="primary" onClick={() => setOpen(true)}>
        Post Preview
      </Button>
      <Modal
        title="Here's what your title and feature image will look like."
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={"100%"}
        footer={null}
      >
       
        <Row justify='center'><h1>{`${title.topic}`}</h1></Row>
        <Row style={{marginTop:"30px", marginBottom:50}} justify='center'>{showImage()}</Row>
      </Modal>
    </Row>
    :step === 1 ? 
    <Row justify='center'>
      <Button type="primary" onClick={() => setOpen(true)}>
          Post Preview
        </Button>
        <Modal
          title="This is your post with the introduction added."
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={"100%"}
          footer={null}
        >
        
          <Row justify='center'><h1>{`${title.topic}`}</h1></Row>
          <Row style={{marginTop:"30px", marginBottom:50}} justify='center'>{showImage()}</Row>
          <Row justify='center'><Col span={14}>{parse(intro.problem)}{parse(intro.introBenefit)}</Col></Row>
        </Modal>
    </Row>
  
    :step === 2 ? 
    <Row justify='center'>
    <Button type="primary" onClick={() => setOpen(true)}>
        Post Preview
      </Button>
      <Modal
        title="This is your post with the subheadings added."
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={"100%"}
        footer={null}
      >
      
        <Row justify='center'><h1>{`${title.topic}`}</h1></Row>
        <Row style={{marginTop:"30px", marginBottom:50}} justify='center'>{showImage()}</Row>
        <Row justify='center'><Col span={14}>{parse(intro.problem)}{parse(intro.introBenefit)}</Col></Row>
       <Row justify='center'><Col span={14}><ShowSubheadings /></Col></Row>
      </Modal>
  </Row>
  
    :step === 3 ? 


    <Row justify='center'>
    <Button type="primary" onClick={() => setOpen(true)}>
        Post Preview
      </Button>
      <Modal
        title="This is your post with the conclusion added."
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={"100%"}
        footer={null}
      >
      
        <Row justify='center'><h1>{`${title.topic}`}</h1></Row>
        <Row style={{marginTop:"30px", marginBottom:50}} justify='center'>{showImage()}</Row>
        <Row justify='center'><Col span={14}>{parse(intro.problem)}{parse(intro.introBenefit)}</Col></Row>
       <Row justify='center'><Col span={14}><ShowSubheadings /></Col></Row>
       <Row style={{marginTop:10}} justify='center'><Col span={14}>{parse(conclusion)}</Col></Row>
      </Modal>
  </Row>
    
    :step === 4 ? null:
    null
  };

   
 
  return (
    <>
       <Steps current={step}>
          <Step title="Create Post Title" description="Piece together your title by filling out the fields." />
          <Step title="Create Post Intro"  description="Create your post introdution here." />
          <Step title="Subheaders" description="Add as many subheaders as you need for your list." />
          <Step title="Conclusion" description="Write a conclusion with a call to action at the end." />
          <Step title="Finalize in Text Editor" description="Finish your post by adding rich text." />
        </Steps>
        <Divider />
       <Row  justify='center'>
      <Col span={16}>
        <Form  layout="vertical" >
          {CycleSteps}
          
        </Form>
      </Col>
     
    </Row>
    <Divider />
  
    <CyclePreviews />
    
    </>
 
  )
}

export default Listicle