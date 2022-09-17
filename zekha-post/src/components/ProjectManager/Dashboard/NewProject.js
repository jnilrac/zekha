import { Button, Modal, Input } from 'antd';
import React, { useState } from 'react';
import { FolderAddOutlined } from '@ant-design/icons';
import {db} from '../../../services/firebase'
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 

const NewProject = ({uid}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [projectTitle, setProjectTitle] = useState('')
  console.log(projectTitle);

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
     await addProject();
     setProjectTitle('');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
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
        <Input name="titleInput" value={projectTitle} onChange={(e) => {setProjectTitle(e.target.value)}} />
      </Modal>
    </>
  );
};

export default NewProject;