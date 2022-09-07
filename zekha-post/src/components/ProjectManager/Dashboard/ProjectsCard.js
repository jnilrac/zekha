import React from 'react'
import { Card, List} from 'antd';

const ProjectsCard = (props) => {
  return (
    
    <List.Item style={{margin:"10px"}}>
        <Card title={props.item.title}>Card content</Card>
    </List.Item>
  
  )
}

export default ProjectsCard