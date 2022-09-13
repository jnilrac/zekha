import React, {useState, useEffect} from 'react'
import {Form, InputNumber, Row, Col, Slider, Input, Space, Divider, Button} from 'antd';
import {useImmer} from 'use-immer';
import Subheading from './Subheading';
import EditSubheading from './EditSubheading';
import SubheadingTable from './SubheadingTable';

const Subheaders = (props) => { 
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
console.log(data);
  return (
    <>          
       <Subheading state={[data, setData]} />
       <EditSubheading state={[data, setData]}  />
        <SubheadingTable state={[data, setData]} />
        
    </>
 
    

  )
}

export default Subheaders;