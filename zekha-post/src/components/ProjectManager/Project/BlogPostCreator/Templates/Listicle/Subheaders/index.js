import React, {useState, useEffect} from 'react'
import {Form, InputNumber, Row, Col, Slider, Input, Space, Divider, Button} from 'antd';
import {useImmer} from 'use-immer';
import Subheading from './Subheading';
import EditSubheading from './EditSubheading';
import SubheadingTable from './SubheadingTable';

const Subheaders = ({uid, tableData,state}) => { 

const [data, setData] = tableData;
const [showEditForm, setShowEditForm] = useState({record:{}, show:false});
const [template, setTemplate ] = state;


const ShowForm = () => {
    if(!showEditForm.show){
        return <Subheading  uid={uid} templateState={[template, setTemplate ]} state={[data, setData]} />;
    }else {
        return <EditSubheading uid={uid} templateState={[template, setTemplate ]} formShow={[showEditForm, setShowEditForm]} state={[data, setData]}  />
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