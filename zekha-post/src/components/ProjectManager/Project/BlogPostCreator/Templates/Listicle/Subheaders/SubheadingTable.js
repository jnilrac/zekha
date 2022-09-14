import { Space, Table, Tag, Button, Popconfirm } from 'antd';
import React, {useEffect, useState} from 'react';


const SubheadingTable = ({templateState, formShow, state}) =>{ 
    const [data, setData] = state; 
    const [showEditForm, setShowEditForm] = formShow;
    const [template, setTemplate ] = templateState;
    const columns = [
        {
          title: 'Subheading Title',
          dataIndex: 'subheadingTitle',
          key: 'subheadingTitle',
          render: (text) => <a>{text}</a>,
        },
      
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => {
            let index = data.indexOf(record);
            let showUp;
            let showDown;
            if(index === 0) {
                showUp = true;
            }
            if(index === data.length -1){
                showDown = true;
            }
            if(showEditForm.show){
                return <span>Edit in progress...</span>
            }
            return (
            <Space size="middle">
              <Button disabled={showUp} onClick={()=>{moveUp(record)}}>Move up</Button>
              <Button disabled={showDown}  onClick={()=>{moveDown(record)}}>Move Down</Button>
              <Button onClick={()=>{editSub(record)}}>Edit</Button>
              
              <Popconfirm title="Are you sure？" onConfirm={()=>{deleteSub(record)}} okText="Yes" cancelText="No">
                <Button>Delete</Button>
              </Popconfirm>
            </Space>
          )
        },
        },
      ];
 

const editSub = (record) => {
    setShowEditForm((showEditForm) => ({...showEditForm, show:true}))
    setShowEditForm((showEditForm) => ({...showEditForm, record:record}))
};
useEffect(()=>{

},[showEditForm])
const deleteSub = (record) => {
    var index = data.indexOf(record);
    const newArray = [...data];
    newArray.splice(index, 1);
    setData(newArray)
    setTemplate((draft) =>{
      draft.subheadings = data;
  })
};

const moveUp = (record) =>{
    var index = data.indexOf(record);
    const newIndex = index -1;
    const newArray = [...data];
    newArray.splice(index, 1);
    newArray.splice(newIndex, 0, record);
    setData(newArray)
    setTemplate((draft) =>{
      draft.subheadings = data;
  })
};

const moveDown = (record) =>{
    var index = data.indexOf(record);
    const newIndex = index +1;
    const newArray = [...data];
    newArray.splice(index, 1);
    newArray.splice(newIndex, 0, record);
    setData(newArray)
    setTemplate((draft) =>{
      draft.subheadings = data;
  })
};



return(
    <Table columns={columns} dataSource={data} />
);

}

export default SubheadingTable;