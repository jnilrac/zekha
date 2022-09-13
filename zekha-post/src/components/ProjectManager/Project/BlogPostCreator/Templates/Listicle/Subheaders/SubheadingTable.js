import { Space, Table, Tag, Button } from 'antd';
import React, {useState} from 'react';


const SubheadingTable = ({state}) =>{ 
    const [data, setData] = state; 
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
          render: (_, record) => (
            <Space size="middle">
              <Button onClick={()=>{moveUp(record)}}>Move up</Button>
              <a>Move Down</a>
              <a>Edit</a>
              <a>Delete</a>
            </Space>
          ),
        },
      ];
 


const moveUp = (record) =>{
    var index = data.indexOf(record);
    const newIndex = index -1;
    const newArray = [...data];
    newArray.splice(index, 1);
    newArray.splice(newIndex, 0, record);
    setData(newArray)
};

return(
    <Table columns={columns} dataSource={data} />
);

}

export default SubheadingTable;