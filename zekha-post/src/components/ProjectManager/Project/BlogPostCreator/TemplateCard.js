import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, List, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore"; 
import { db } from '../../../../services/firebase';




const TemplateCard = ({post ,curTemp, curProj, uid, item, content, submitButton}) => {
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = curProj;
  const {key} = currentProject;
  const [finalPost, setFinalPost] = post;
  const [template, setTemplate] = curTemp;
  const [submitDisabled, setSubmitDisabled] = submitButton;
  

 const {title,type} = template;
  const showDrawer = () => {
    setOpen(true);
  };
  const listicleTemplate = {
    type:'listicle',
    title:{
      topic: ''
    },
    heroImage: '',
    intro: {
      problem:'',
      introBenefit: ''
    },
    subheadings:[
    ],
    conclusion: ''
  
  }
  const onClose = () => {
    setOpen(false);
    if(template.type === 'listicle') setTemplate(listicleTemplate);
  };

  const addPost = async () => {
    const postString = JSON.stringify(finalPost)
    const timestamp =  serverTimestamp();
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "posts"), {
      templateType: type,
      title: title.topic,
      content: postString,
      postCreator: uid,
      parentProject: key,
      timestamp: timestamp
    });
  
   onClose();
  };
 
  useEffect(() => {
    console.log(key)
  if(key === undefined || key.length === 0){
    setCurrentProject(JSON.parse(window.localStorage.getItem('currentProject')))
    console.log(window.localStorage.getItem('currentProject'))
  } else if (key.length > 0 ) {
    const localProject = JSON.stringify(currentProject)
    window.localStorage.setItem('currentProject', localProject);
  }
  
  }, [key])


  return (
    <>
      
    <List.Item onClick={showDrawer} style={{margin:"10px"}}>
    <Card title={item.title}>{item.content}</Card>
    </List.Item>
      <Drawer
        destroyOnClose
        title="Create a new blog post."
        width={"100%"}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button disabled={submitDisabled} onClick={addPost} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
       {item.template}
      </Drawer>
    </>
  );
};

export default TemplateCard;