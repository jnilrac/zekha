import React, {useState, useEffect} from 'react'
import {Form, InputNumber, Row, Col, Slider, Input, Space, Divider, Button} from 'antd';
import {useImmer} from 'use-immer';
import Subheading from './Subheading';
import EditSubheading from './EditSubheading';
import SubheadingTable from './SubheadingTable';

const Subheaders = ({state}) => { 
    const subs = [
        {
          key: '1',
          title: 'John Brown',
          order: 1,
        },
        {
          key: '2',
          title: 'Jack Black',
          order: 2,
        },
        {
          key: '3',
          title: 'Green Giant',
          order: 3,
        },
       
      ];

const [data, setData] = useState([])
const [showEditForm, setShowEditForm] = useState({record:{}, show:false});
const [template, setTemplate ] = state;
const ShowForm = () => {
    if(!showEditForm.show){
        return <Subheading templateState={[template, setTemplate ]} state={[data, setData]} />;
    }else {
        return <EditSubheading templateState={[template, setTemplate ]} formShow={[showEditForm, setShowEditForm]} state={[data, setData]}  />
    }
}

  return (
    <>          
       
       <ShowForm />
        <SubheadingTable templateState={[template, setTemplate ]} formShow={[showEditForm, setShowEditForm]} state={[data, setData]} />
        
    </>
 
    

  )
}

export default Subheaders;