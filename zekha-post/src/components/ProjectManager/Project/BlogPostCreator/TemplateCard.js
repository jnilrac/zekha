import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, List, Card } from 'antd';
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from "firebase/firestore"; 
import { db } from '../../../../services/firebase';




const TemplateCard = ({post ,curTemp, curProj, uid, item, content}) => {
  const [open, setOpen] = useState(false);
  const [currentProject, setCurrentProject] = curProj;
  console.log(currentProject)
  const [finalPost, setFinalPost] = post;
  const [template, setTemplate] = curTemp;
 const {title} = template;
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
      title: title.topic,
      content: postString,
      postCreator: uid,
      parentProject: currentProject.key,
      timestamp: timestamp
    });
  
   onClose();
  };
 

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
            <Button onClick={addPost} type="primary">
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