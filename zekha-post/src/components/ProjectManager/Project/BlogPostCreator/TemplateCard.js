import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, List, Card } from 'antd';
import React, { useState } from 'react';




const TemplateCard = (props) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

 

  return (
    <>
      
    <List.Item onClick={showDrawer} style={{margin:"10px"}}>
    <Card title={props.item.title}>{props.item.content}</Card>
    </List.Item>
      <Drawer
        destroyOnClose
        title="Create a new account"
        width={"100%"}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
       {props.item.template}
      </Drawer>
    </>
  );
};

export default TemplateCard;