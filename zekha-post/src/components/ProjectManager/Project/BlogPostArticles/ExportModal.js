import { Button, Modal, Popconfirm } from 'antd';
import React, { useState, useEffect } from 'react';
import { db } from '../../../../services/firebase';
import {doc, collection, getDoc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';

const ExportModal = ({keys, hasSelected}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [selectedRowKeys, setSelectedRowKeys]  = keys;
  const [download, setDownload] = useState("");
  const [exportsArray, setExportsArray] = useState([]);
  const [dataAdded, setDataAdded] = useState(false);
  

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    exportData();
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const confirm = () =>{
    showModal();
   
  };

  const getData = async () => {
    console.log('gettingData')
    await selectedRowKeys.map(async (key)=>{
           
        const docRef = doc(db, "posts", key);
        const docSnap = await getDoc(docRef);
        const snapTitle = docSnap.data().title;
        const snapContent = docSnap.data().content;
        const contentDelta = JSON.parse(snapContent);
        setExportsArray((exportsArray) => ([...exportsArray, {title:snapTitle, content:contentDelta}]))  
    });
    setDataAdded(true)
  }; 

   const exportData = async () => {

        const blob = new Blob([JSON.stringify(exportsArray)], {
            type: "application/json",
          });
          console.log(blob)
          const url = URL.createObjectURL(blob);
          //setDownload(url);
          const element = document.createElement("a");
          element.href = url;
          element.download = "ZekhaPostExport" + Date.now() + ".json";
          document.body.appendChild(element); // Required for this to work in FireFox
          element.click();
   };

  useEffect(()=>{
    if(selectedRowKeys < 1) {
        setExportsArray([]);
        setDataAdded(false);
    }
    if(selectedRowKeys.length > 0 && dataAdded === false){
        console.log(selectedRowKeys)
        getData();
        console.log("effect")
    } 
    
  },[selectedRowKeys])

  const cancel = () => {

  };

  return (
    <>
      <Popconfirm
            title="Are you sure you want to export selected post(s)?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            disabled={!hasSelected}
          >
            <Button type="primary" disabled={!hasSelected}>Export</Button>
          
          </Popconfirm>
      <Modal
        title="Export Complete!"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Click ok to download export.</p>
      </Modal>
    </>
  );
};

export default ExportModal;