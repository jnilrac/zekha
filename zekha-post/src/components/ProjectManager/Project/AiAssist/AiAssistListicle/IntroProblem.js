import React, {useState, useEffect} from 'react'
import {Form,Input, Select, Row, Button, Col} from 'antd';
import {useImmer} from "use-immer";
const {Option} = Select;

const IntroProblem = ({update,assistShow}) => {
  
  const [wordCountOptions, setWordCountOptions] =  useState([]);
  const [paragraphOptions, setParagraphOptions] =  useState([]);
  //const [localData, setLocalData] = useImmer({});
  //const {topic, paragraphCount, wordCount} = localData;
  const [assister, setAssister] = assistShow;
 


// Completions
 const Completions = () => {
  const [ promptData, setPromptData ] = useState('');
  const [localData, setLocalData] = useImmer({});
  const {topic, paragraphCount, wordCount} = localData;

  const handleUpdate = (event, eventType) => {
    if (eventType === 'topic') setLocalData(draft => {draft.topic = event.target.value})
    else if (eventType === 'paragraphCount') setLocalData(draft => {draft.paragraphCount = event})
    else if (eventType === 'wordCount') setLocalData(draft => {draft.wordCount = event})
  };

  const sendPrompt = () => {
    let paraCount;
        if(paragraphCount > 1) {paraCount = "paragraphs"}
        else {paraCount = 'paragraph'}
        console.log(paraCount)
    setPromptData(`write ${wordCount} words in ${paragraphCount} ${paraCount} about why ${topic} is a problem.`)
    update(promptData, 'problem');
    setAssister(!assister);
  };

     // Rerender to set Prompt Data

     useEffect(() => {
      let paraCount;
          if(paragraphCount > 1) {paraCount = "paragraphs"}
          else {paraCount = 'paragraph'}
          console.log(paraCount)
      setPromptData(`write ${wordCount} words in ${paragraphCount} ${paraCount} about why ${topic} is a problem.`)
     }, [topic, wordCount, paragraphCount])


  return (
    <Row >
    
          
          <Col style={{marginBottom:20}} span={12}>
            <h2>Word Count:</h2>
          </Col>

          <Col style={{marginBottom:20}} span={12}>
              <Select style={{width:"100%"}} value={wordCount} onChange={e => {handleUpdate(e,"wordCount")}}>{wordCountOptions}</Select>
          </Col>
                 
          <Col style={{marginBottom:20}} span={12}>
            <h2>Paragraph Count:</h2>
          </Col>
          <Col style={{marginBottom:20}} span={12}>
              <Select style={{width:"100%"}} value={paragraphCount} onChange={e => {handleUpdate(e,"paragraphCount")}}>{paragraphOptions}</Select>
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

 // Completion Use Effects 
  useEffect(() => {
    
    const getOptions = () => {
     
      const wordCountOptionsArray = [];
      for(let i = 100; i < 500; i += 100){
        wordCountOptionsArray.push(<Option key={i} value={i}>{`${i} words`}</Option>)
      }
      setWordCountOptions(wordCountOptions => ([...wordCountOptions, wordCountOptionsArray]));
      
      const paragraphOptionsArray = [];
      for(let i = 1; i < 4; i++){
        let paraCount;
        if(i> 1) {paraCount = "paragraphs"}
        else {paraCount = 'paragraph'}
       paragraphOptionsArray.push(<Option key={i} value={i}>{`${i} ${paraCount}`}</Option>)
      }
      setParagraphOptions(paragraphOptions => ([...paragraphOptions, paragraphOptionsArray]));
    };
    getOptions();
  }, [])
  

  //Summarization

 

  const Summarization = () => {
    const [summary, setSummary] = useImmer('');
    console.log(summary);

    const handleSummaryUpdate = (event, eventType) => {
      setSummary(event.target.value)
    }
  
    const sendSummary = () => {
      
      update(summary, 'problem');
      setAssister(!assister);
    };
  
    return(
      <>
        <Row justify='center'>
          <Col span={24}>
          <p>Paste text you want to summarize here.</p>
          </Col>
          <Col span={24}>
            <Input.TextArea rows={10} value={summary} onChange={e => {handleSummaryUpdate(e)}}/>

          </Col>
          <Col span={24}>
          <Row style={{margin:10}} justify='center'><Button onClick={sendSummary}>Run Ai</Button></Row>
          </Col>
        </Row>
    
      </>
    )
  }

 
  return (
    <>
    <Completions />
    <Summarization />
    </>
    
  )
}

export default IntroProblem;