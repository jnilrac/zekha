import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Popconfirm, message } from 'antd';
import { doc, query, where, onSnapshot, collection, deleteDoc, setDoc, updateDoc, serverTimestamp, getDocs} from "firebase/firestore";
import { db } from '../../../../services/firebase';
import BlogPostEditor from '../BlogPostEditor/BlogPostEditor';
import ExportModal from './ExportModal';




const BlogPostArticles = ({curProj, uid}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [currentProject, setCurrentProject] = curProj;
  const {title, key} = currentProject;
 console.log(uid)


 const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Date Created',
    dataIndex: 'timestamp',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <BlogPostEditor post={record.key} />
    
      </Space>
    ),
  },
];


const confirm = (e) => {
 deletePosts();
  message.success('Post(s) deleted!');
};

const cancel = (e) => {
  
};


const deletePosts = async () => {
  selectedRowKeys.map( async (id) => {
    await deleteDoc(doc(db, "posts", id));
  });
}

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

 useEffect(() => {
    
  // Firebase realtime listenter

   if(uid){ 
    
    const q = query(collection(db, "posts"), where("parentProject", "==", key));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const postArray = [];
    querySnapshot.forEach((doc) => {
      const {title, timestamp}= doc.data();

      const dataFields = {
          key: doc.id,
          title:title,
          timestamp: timestamp,
       }
       postArray.push(dataFields)
      
    });
    setData(postArray)
    
});

return () => {
  unsubscribe();
  }
}


},[uid, key]);

  const start = () => {
    setLoading(true); // ajax request after empty completing

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <div
        style={{
          marginBottom: 16,
          padding: 16
        }}
      >
        <Space size={"large"}>
        <Popconfirm
            title="Are you sure you want to delete selected post(s)?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            disabled={!hasSelected}
          >
            <Button type="primary" disabled={!hasSelected}>
              Delete Selected
            </Button>
          
          </Popconfirm>
          <ExportModal keys={[selectedRowKeys, setSelectedRowKeys]} hasSelected={hasSelected} />
        </Space>
         
        
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
}

export default BlogPostArticles