import React, { useState } from 'react';
import { Button, Table, Space, Popconfirm, message } from 'antd';


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Date Created',
    dataIndex: 'createdAt',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Open in Creator</a>
    
      </Space>
    ),
  },
];
const data = [];

for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    createdAt: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const confirm = (e) => {
  console.log(e);
  message.success('Click on Yes');
};

const cancel = (e) => {
  console.log(e);
  message.error('Click on No');
};


const BlogPostArticles = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

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
          <Popconfirm
            title="Are you sure you want to move selected post(s) to export queue?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            disabled={!hasSelected}
          >
            <Button type="primary" disabled={!hasSelected}>
              Send to Export Queue
            </Button>
          
          </Popconfirm>

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