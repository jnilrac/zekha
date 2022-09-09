import React from 'react'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const BlogPostEditor = () => {
  return (
    <Layout style={{height:"80vh", borderRadius:"30px"}} >
    <Content style={{padding: 10, backgroundColor:"grey"}}>
    <h1>Content</h1>
    </Content>
    <Sider theme='light' style={{padding: 10, border:'2px solid #969799', backgroundColor:"black"}}>
      <h1>Sider</h1>
    </Sider>
 </Layout>
  )
}

export default BlogPostEditor;