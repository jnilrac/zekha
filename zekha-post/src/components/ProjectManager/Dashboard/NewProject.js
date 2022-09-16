import { Button, Modal, Input } from 'antd';
import React, { useState } from 'react';
import { FolderAddOutlined } from '@ant-design/icons';
const NewProject = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [projectTitle, setProjectTitle] = useState('')
  console.log(projectTitle);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
 
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
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
        <Input name="titleInput" onChange={(e) => {setProjectTitle(e.target.value)}} />
      </Modal>
    </>
  );
};

export default NewProject;