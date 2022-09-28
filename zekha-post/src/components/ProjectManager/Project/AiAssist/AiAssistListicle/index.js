import React, {useState, useEffect} from 'react'
import {Form,Input, Select, Row, Button, Col, Radio, Divider} from 'antd';
import {useImmer} from "use-immer";
import { functions } from '../../../../../services/firebase';
import { getFunctions, httpsCallable } from "firebase/functions";
import { LIST_IGNORE } from 'antd/lib/upload/Upload';
const {Option} = Select;

const AiAssistListicle = ({update,assistShow,templateEvent}) => {
  
  const [wordCountOptions, setWordCountOptions] =  useState([]);
  const [paragraphOptions, setParagraphOptions] =  useState([]);
  const [titleItemOptions, setTitleItemOptions] =  useState([]);
  const [radioValue, setRadioValue] = useState('completion');
  //const [localData, setLocalData] = useImmer({});
  //const {topic, paragraphCount, wordCount} = localData;
  const [assister, setAssister] = assistShow;
 console.log(templateEvent)
 const functions = getFunctions();







// Completions
 const Completions = () => {
  const [ promptData, setPromptData ] = useState('');
  const [localData, setLocalData] = useImmer({});
  const {topic, paragraphCount, wordCount, listNum, keywords} = localData;
  //validation
  const [isTopicError, setIsTopicError] = useState('');
  const [topicVal, setTopicVal] = useState('');
  const [isListNumError, setIsListNumError] = useState('');
  const [listNumVal, setListNumVal] = useState('');
  const [isParagraphCountError, setIsParagraphCountError ] = useState('');
  const [ paragraphCountVal, setParagraphCountVal ] = useState('');
  const [ isWordCountError, setIsWordCountError ] = useState('');
  const [ wordCountVal, setWordCountVal ] = useState('');
  const [ isKeywordError, setIsKeywordError ] = useState('');
  const [keywordVal, setKeywordVal] = useState('');

  const validateTitle =  () => {
    if(!topic || !listNum) {
      if(!topic) {
        setIsTopicError('error');
        setTopicVal("Title is Required!");
        
      }
      if(!listNum){
        setIsListNumError('error');
        setListNumVal("Item Count is required!");
        
      }
      return;
    }
    sendPrompt();
  };

  const validateSubheadingTitle = () =>{
    if(!topic) {
      setIsTopicError('error');
      setTopicVal('Topic is required!')
      return;
    }
    sendPrompt();
  };

  const validate = () => {
    if( !topic || !paragraphCount || !wordCount ) {
      if(!topic){
        setIsTopicError('error');
        setTopicVal("Title is Required!");
        console.log("no Topic")
      }
      if(!paragraphCount){
        setIsParagraphCountError('error');
        setParagraphCountVal('Paragraph Count is required!');
        console.log("no Para Count")
      }
      if(!wordCount){
        setIsWordCountError('error');
        setWordCountVal('Word Count is required!');
        console.log("no word Count")
      }
      return;
    }
  
    sendPrompt();
  };

  const handleUpdate = (event, eventType) => {
    if (eventType === 'topic') {
      setIsTopicError('');
      setTopicVal('');
      setLocalData(draft => {draft.topic = event.target.value});
    }
    else if (eventType === 'paragraphCount') {
      setIsParagraphCountError('');
      setParagraphCountVal('');
      setLocalData(draft => {draft.paragraphCount = event});
    }
    else if (eventType === 'wordCount') {
      setIsWordCountError('');
      setWordCountVal('');
      setLocalData(draft => {draft.wordCount = event});
    }
    else if (eventType === 'listNum') {
      setIsListNumError('');
      setListNumVal('');
      setLocalData(draft => {draft.listNum = event});
    }
    else if (eventType === 'keywords') {
      setIsKeywordError('');
      setKeywordVal('');
      setLocalData(draft => {draft.keywords = event.target.value});
    }
  };
  //firebase Callable Functions
  const completionsCall = async () => {
    console.log(promptData)
    const getCompletions = httpsCallable(functions, 'openAiCompletion');
    console.log(promptData)
    const result = await getCompletions({prompt: promptData, templateEvent: templateEvent});
    const text = result.data[0].text
    console.log(text)
    update(text, templateEvent);     
  };

  

  const sendPrompt = () => {
  
    if(templateEvent === "topic") {
      setPromptData(`Write blog post title, with proper capitalization, and with two adjectives decribing a list of ${listNum} ${topic}.`)
      completionsCall();
    } else if (templateEvent === "problem")  {
      let paraCount;
      if(paragraphCount > 1) {paraCount = "paragraphs"}
      else {paraCount = 'paragraph'}
      setPromptData(`write ${wordCount} words in ${paragraphCount} ${paraCount} about why ${topic} is a problem and use the following comma separated keywords:${keywords}`)
      completionsCall();
    } else if (templateEvent === "introBenefit")  {
      let paraCount;
      if(paragraphCount > 1) {paraCount = "paragraphs"}
      else {paraCount = 'paragraph'}
      setPromptData(`write ${wordCount} words in ${paragraphCount} ${paraCount} about why ${topic} is beneficial.`)
      completionsCall();
    } else if (templateEvent === "subheadingTitle")  {
      
      setPromptData(`write a title for an article subheading about ${topic}.`)
      console.log(`this event is ${templateEvent} and the promptData is ${promptData}`)
      completionsCall();
    } else if (templateEvent === "clearBenefit")  {
      let paraCount;
      if(paragraphCount > 1) {paraCount = "paragraphs"}
      else {paraCount = 'paragraph'}
      setPromptData(`write ${wordCount} words in ${paragraphCount} ${paraCount} about why ${topic} is beneficial.`)
      completionsCall();
    } else if (templateEvent === "actionItems")  {
      let paraCount;
      if(paragraphCount > 1) {paraCount = "paragraphs"}
      else {paraCount = 'paragraph'}
      setPromptData(`write ${wordCount} words in a bullet list consisting of ${paragraphCount} ${paraCount} about how to benefit from ${topic}.`)
      completionsCall();
    }else if (templateEvent === "conclusion")  {
      let paraCount;
      if(paragraphCount > 1) {paraCount = "paragraphs"}
      else {paraCount = 'paragraph'}
      setPromptData(`write a conclusion ${wordCount} words in  ${paragraphCount} ${paraCount} ending with a 1 sentence Call to action about ${topic}.`)
      completionsCall();
    }
  
    setAssister(!assister);
  };

     // Rerender to set Prompt Data

     useEffect(() => {
      if(templateEvent === "topic") {
        setPromptData(`Write blog post title, with proper capitalization, and with two adjectives decribing a list of ${listNum} ${topic}.`)
      } else if (templateEvent === "problem")  {
        let paraCount;
        if(paragraphCount > 1) {paraCount = "paragraphs"}
        else {paraCount = 'paragraph'}
        setPromptData(`write ${wordCount} words in ${paragraphCount} ${paraCount} about why ${topic} is a problem and use the following comma separated keywords:${keywords}`)
       
      } else if (templateEvent === "introBenefit")  {
        let paraCount;
        if(paragraphCount > 1) {paraCount = "paragraphs"}
        else {paraCount = 'paragraph'}
        setPromptData(`write ${wordCount} words in ${paragraphCount} ${paraCount} about why ${topic} is beneficial.`)
        
      } else if (templateEvent === "subheadingTitle")  {
        setPromptData(`write a subheading title about ${topic}.`)
        
      } else if (templateEvent === "clearBenefit")  {
        let paraCount;
        if(paragraphCount > 1) {paraCount = "paragraphs"}
        else {paraCount = 'paragraph'}
        setPromptData(`write ${wordCount} words in ${paragraphCount} ${paraCount} about why ${topic} is beneficial.`)
        
      } else if (templateEvent === "actionItems")  {
        let paraCount;
        if(paragraphCount > 1) {paraCount = "paragraphs"}
        else {paraCount = 'paragraph'}
        setPromptData(`write ${wordCount} words in a bullet list consisting of ${paragraphCount} ${paraCount} about how to benefit from ${topic}.`)
        
      }else if (templateEvent === "conclusion")  {
        let paraCount;
        if(paragraphCount > 1) {paraCount = "paragraphs"}
        else {paraCount = 'paragraph'}
        setPromptData(`write a conclusion ${wordCount} words in  ${paragraphCount} ${paraCount} ending with a 1 sentence Call to action about ${topic}.`)
        
      }
     }, [topic, wordCount, paragraphCount, listNum])


     if(templateEvent === "subheadingTitle") {
      return(
        <Row >
          <Col style={{marginBottom:20}} span={24}>
             <center><h2>what keywords must be included?</h2></center>
             <center><p>Separate each keyword or phrase with a comma.</p></center>
          </Col>
          <Col style={{marginBottom:20}} span={24}>
            <Form.Item
            label="Keywords"
            help={keywordVal}
            validateStatus={isKeywordError}
            >
             <Input value={keywords} onChange={e => {handleUpdate(e, "keywords")}}/>
            </Form.Item>
               
          </Col>
          <Col style={{marginBottom:20}} span={24}>
             <center><h2>What's the topic?</h2></center>
          </Col>
          <Col style={{marginBottom:20}} span={24}>
            <Form.Item
            label="Topic"
            help={topicVal}
            validateStatus={isTopicError}
            >
            <Input value={topic} onChange={e => {handleUpdate(e, "topic")}}/>
            </Form.Item>
               
          </Col>
            <Col span={24}>
              <Row justify='center'><Button onClick={validateSubheadingTitle}>Run Ai</Button></Row>
            </Col>
        </Row>
      );
     }
     if(templateEvent === "topic" ){
      console.log(templateEvent)
      return (
        <Row >
           <Col style={{marginBottom:20}} span={24}>
             <center><h2>How many items are in this list?</h2></center>
          </Col>
          <Col style={{marginBottom:20}} span={24}>
            <Form.Item
            label="List Items"
            help={listNumVal}
            validateStatus={isListNumError}
            >
             <Select style={{width:"100%"}} value={listNum} onChange={e => {handleUpdate(e,"listNum")}}>{titleItemOptions}</Select>
            </Form.Item>
               
          </Col>
          <Col style={{marginBottom:20}} span={24}>
             <center><h2>What's the topic?</h2></center>
          </Col>
          <Col style={{marginBottom:20}} span={24}>
            <Form.Item
            label="Topic"
            help={topicVal}
            validateStatus={isTopicError}
            >
              <Input value={topic} onChange={e => {handleUpdate(e, "topic")}}/>
            </Form.Item>
               
          </Col>
            <Col span={24}>
              <Row justify='center'><Button onClick={validateTitle}>Run Ai</Button></Row>
            </Col>
        </Row>
       
      )
     } else {
      return (
        <Col offset={6} span={12}>
            <Row justify='center'>
            <Col style={{marginBottom:20}} span={24}>
                <center><h2>what keywords must be included?</h2></center>
                <center><p>Separate each keyword or phrase with a comma.</p></center>
            </Col>
          <Col style={{marginBottom:20}} span={24}>
            <Form.Item
            label="Keywords"
            help={keywordVal}
            validateStatus={isKeywordError}
            >
             <Input value={keywords} onChange={e => {handleUpdate(e, "keywords")}}/>
            </Form.Item>
               
          </Col>
                  
            <Col  style={{marginBottom:20}} span={24}>
              <h2>Word Count:</h2>
            </Col>

            <Col  style={{marginBottom:20}} span={24}>
              <Form.Item
              label="Word Count"
              help={wordCountVal}
              validateStatus={isWordCountError}
              >
                <Select style={{width:"100%"}} value={wordCount} onChange={e => {handleUpdate(e,"wordCount")}}>{wordCountOptions}</Select>
              </Form.Item>
               
            </Col>
                  
            <Col  style={{marginBottom:20}} span={24}>
              <h2>Paragraph Count:</h2>
            </Col>
            <Col  style={{marginBottom:20}} span={24}>
              <Form.Item
              label="Paragraph Count"
              help={paragraphCountVal}
              validateStatus={isParagraphCountError}
              >
                <Select style={{width:"100%"}} value={paragraphCount} onChange={e => {handleUpdate(e,"paragraphCount")}}>{paragraphOptions}</Select>
              </Form.Item>
                
            </Col>
          
          <Col  style={{marginBottom:20}} span={24}>
          <h2>What's the topic?</h2>
          </Col>
          <Col  style={{marginBottom:20}} span={24}>
            <Form.Item
            label="Topic"
            help={topicVal}
            validateStatus={isTopicError}
            >
             <Input value={topic} onChange={e => {handleUpdate(e, "topic")}}/>
            </Form.Item>
              
          </Col>
          
              <Row justify='center'><Button onClick={validate}>Run Ai</Button></Row>
          
        </Row>
        </Col>
        
       
      )
     }

 
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

      const titleOptionsArray = []

      for(let i = 1; i < 26 ; i++){
        let itemCount;
        if(i> 1) {itemCount = "items"}
        else {itemCount = 'item'}
        titleOptionsArray.push(<Option key={i} value={i}>{`${i} ${itemCount}`}</Option>)
      }

      setTitleItemOptions(titleItemOptions => ([...titleItemOptions, titleOptionsArray]));

    };

   
    getOptions();
  }, [])
  

  //Summarization



  const Summarization = () => {
    const [ isKeywordError, setIsKeywordError ] = useState('');
    const [keywordVal, setKeywordVal] = useState('');
    const [isTextError, setIsTextError] = useState('');
    const [ textVal, setTextVal ] = useState('');
    const [summary, setSummary] = useImmer({});
    const {text, keywords} =  summary;

    // Validation
    const validate = () => {
      if(!text){
        setIsTextError('error');
        setTextVal('Please enter text to be summarized.')
        return;
      }
      sendSummary()
    }


    //firebase Callable Function
  const summarizationCall = async () => {
    const getCompletions = httpsCallable(functions, 'openAiSummary');
    const result = await getCompletions(summary);
    const summaryDisplay = result.data[0].text;
    update(summaryDisplay, templateEvent);     
  }   

    const handleSummaryUpdate = (event, eventType) => {
      if (eventType === 'summary') {
        setIsTextError('');
        setTextVal('');
        setSummary(draft => {draft.text = event.target.value});
      }
      if (eventType === 'keywords') {
        setIsKeywordError('');
        setKeywordVal('');
        setSummary(draft => {draft.keywords = event.target.value})
      }
      
    }
  
    const sendSummary = () => {
      summarizationCall();
      setAssister(!assister);
    };
  
    return(
        <div style={{width:"80em"}}>
          <Row style={{width:"100%"}} justify='center'>
          <Col style={{marginBottom:20}} span={24}>
             <center><h2>what keywords must be included?</h2></center>
             <center><p>Separate each keyword or phrase with a comma.</p></center>
          </Col>
          <Col style={{marginBottom:20}} span={24}>
            <Form.Item
            label="Keywords"
            help={keywordVal}
            validateStatus={isKeywordError}
            >
              <Input value={keywords} onChange={e => {handleSummaryUpdate(e, "keywords")}}/>
            </Form.Item>
               
          </Col>
            <Col span={24}>
            <p>Paste text you want to summarize here.</p>
            </Col>
            <Col span={24}>
              <Form.Item
              label="Text to Summarize"
              help={textVal}
              validateStatus={isTextError}
              >
               <Input.TextArea rows={10} value={text} onChange={e => {handleSummaryUpdate(e, "summary")}}/>
              </Form.Item>
              

            </Col>
            <Col  span={24}>
            <Row style={{margin:20}} justify='center'><Button onClick={validate}>Run Ai</Button></Row>
            </Col>
          </Row>
        </div>
        
    
     
    )
  }

const ElementPicker = () => {
  console.log(radioValue)
  if(radioValue === "completion") {return <Completions />}
  else if(radioValue === "summarization") {return <Summarization />}
};

if(templateEvent === "topic" || templateEvent === "subheadingTitle") return <ElementPicker />
 
  return (
    <>
    <Row >
      <Radio.Group onChange={(e) => {setRadioValue(e.target.value)}} value={radioValue}>
      <Radio value={"completion"}>Use Text Completion</Radio>
      <Radio value={"summarization"}>Use Summarization</Radio>
    </Radio.Group>
    <Divider />
   <ElementPicker />
    </Row>
    
    
    
    </>
    
  )
}

export default AiAssistListicle;