import { Button, Modal, Input, Form } from 'antd';
import React, { useState } from 'react';
import { FolderAddOutlined } from '@ant-design/icons';
import {db} from '../../../services/firebase'
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 


const NewProject = ({uid}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [projectTitle, setProjectTitle] = useState('')
  const [isError , setIsError] = useState('');


  const addProject = async () => {
    // Add a new document with a generated id.
    const timestamp = serverTimestamp()
    const docRef = await addDoc(collection(db, "projects"), {
    projectTitle: projectTitle,
    projectCreator: uid,
    timestamp: timestamp
    });
    console.log("Document written with ID: ", docRef.id);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    
    if(projectTitle.length < 1) {
      setIsError('error')
      return;
    }
     await addProject();
     setProjectTitle('');
      setConfirmLoading(true);
      setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 750);
  };

  const handleCancel = () => {
    setProjectTitle('');
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      <Button size={'large'} type="primary" shape="circle" onClick={showModal}icon={<FolderAddOutlined />}></Button>
      <Modal
        title="New Project"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Project Title:</p>
        <Form>
        <Form.Item
          label="Project Title"
          hasFeedback
          validateStatus={isError}
          help="Please enter project title."
        >
         <Input name="titleInput" value={projectTitle} onChange={(e) => {
          setIsError('');
          setProjectTitle(e.target.value);
          }} /> 
        </Form.Item>
        </Form>
           
      </Modal>
    </>
  );
};

export default NewProject;