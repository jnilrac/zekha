import React from 'react'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const BlogPostCreator = () => {
  return (
    <Layout style={{height:"80vh"}} >
    <Sider theme='light' style={{padding: 10}}>
      <h1>Sider</h1>
    </Sider>
    <Content style={{padding: 10, backgroundColor:"white", borderLeft:'2px solid #969799'}}>
    <h1>Content</h1>
    </Content>
    <Sider theme='light' style={{padding: 10, borderLeft:'2px solid #969799'}}>
      <h1>Sider</h1>
    </Sider>
 </Layout>
  )
}

export default BlogPostCreator