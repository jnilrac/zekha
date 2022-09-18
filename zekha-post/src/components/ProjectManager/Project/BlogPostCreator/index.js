import React, {useState, useEffect} from 'react'
import { Col, Row, Divider, List } from 'antd';
import TemplateCard from './TemplateCard'
import Listicle from './Templates/Listicle';
import { UserAuth } from '../../../../contexts/authcontext';
import {useImmer} from 'use-immer';


const listicleTemplate = {
  type:'listicle',
  title:{
    topic: ''
  },
  heroImage: '',
  intro: {
    problem:'',
    introBenefit: ''
  },
  subheadings:[
  ],
  conclusion: ''

}


const BlogPostCreator = ({curProj, uid}) => {
 const [currentProject, setCurrentProject] = curProj;
 const {title, key} = currentProject;
 const [template, setTemplate] = useImmer(listicleTemplate );
 const [finalPost, setFinalPost] = useState('');
  
  const data = [
    {
      title: 'Listicle',
      template: <Listicle post={[finalPost, setFinalPost]}  curTemp={[template, setTemplate]} curProj={[currentProject, setCurrentProject]} uid={uid} />,
      content: "A list of 10-25 bite-sized tips, strategies, techniques, tools… or anything else that makes sense for a list.",
    }
  ];

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

  return (
    <>
    
    <Row justify='center'>
        <Col><h1>Post Templates</h1></Col>
    </Row>
    <Row justify='center'>
        <Col><h3>Pick a template for your post.</h3></Col>
    </Row>
    <Row justify='center'>
        <Col span={24} style={{backgroundColor: "#1DA57A", borderRadius:"10px", opacity:"0.5", padding:"20px", overflowY:"scroll", height:"80vh"}}>
        <List
    grid={{
      gutter: 16,
      column: 4,
    }}
    dataSource={data}
    renderItem={(item) => (
      <TemplateCard curTemp={[template, setTemplate]} post={[finalPost, setFinalPost]} curProj={[currentProject, setCurrentProject]} uid={uid} item={item} content={item.content} />
    )}
  />
        </Col>
    </Row>
   
    </>
  )
}

export default BlogPostCreator;