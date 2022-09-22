import React, {useState, useEffect} from 'react'
import {Form,Input, Select, Row, Button, Col} from 'antd';
import {useImmer} from "use-immer";
const {Option} = Select;

const Title = ({update,assistShow}) => {
  const [ promptData, setPromptData ] = useState('');
  const [options, setOptions] =  useState([]);
  const [titleData, setTitleData] = useImmer({});
  const {topic, listNum} = titleData;
  const [assister, setAssister] = assistShow;
  console.log(topic)
 useEffect(() => {
  setPromptData(`write a title for an article listing ${listNum} ${topic}.`)
 }, [listNum, topic])

  const sendPrompt = () => {
    setPromptData(`write a title for an article listing ${listNum} ${topic}.`)
    update(promptData, 'topic');
    setAssister(!assister);
  };

  const handleUpdate = (event, eventType) => {
    if (eventType === 'topic') setTitleData(draft => {draft.topic = event.target.value})
    else if (eventType === 'listNum') setTitleData(draft => {draft.listNum = event})
  };




  useEffect(() => {
    
    const getOptions = () => {
      const optionsArray = [];
      for(let i = 1; i < 26; i++){
        optionsArray.push(<Option key={i} value={i}>{`${i}`}</Option>)
      }
      setOptions(options => ([...options, optionsArray]));
    };
    getOptions();
  }, [])

  return (
    <Row >
       <Col style={{marginBottom:20}} span={24}>
         <center><h2>How many items are in this list?</h2></center>
      </Col>
      <Col style={{marginBottom:20}} span={24}>
           <Select style={{width:"100%"}} value={listNum} onChange={e => {handleUpdate(e,"listNum")}}>{options}</Select>
      </Col>
      <Col style={{marginBottom:20}} span={24}>
         <center><h2>What's the topic?</h2></center>
      </Col>
      <Col style={{marginBottom:20}} span={24}>
           <Input value={topic} onChange={e => {handleUpdate(e, "topic")}}/>
      </Col>
        <Col span={24}>
          <Row justify='center'><Button onClick={sendPrompt}>Run Ai</Button></Row>
        </Col>
    </Row>
   
  )
}

export default Title