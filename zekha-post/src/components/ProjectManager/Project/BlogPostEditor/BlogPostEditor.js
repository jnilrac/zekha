import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import ExistingPostEditor from './ExistingPostEditor';
import { db } from '../../../../services/firebase';
import {doc, collection, updateDoc} from 'firebase/firestore'
const { Option } = Select;


const BlogPostEditor = ({post}) => {
  const [open, setOpen] = useState(false);
  const [editedPost, setEditedPost] = useState({});
  const {title, content} = editedPost;
  const editedPostContentString = JSON.stringify(content); 

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const updatePost =  async () => {

    const postRef = doc(db, "posts", post);

    await updateDoc(postRef , {
      title: editedPost.title,
      content: editedPostContentString
    });

    onClose();
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        Edit Post
      </Button>
      <Drawer
       destroyOnClose
        title="Edit Post"
        width={"100%"}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={updatePost} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <ExistingPostEditor editPost={[editedPost, setEditedPost]} post={post} />
      </Drawer>
    </>
  );
};

export default BlogPostEditor;