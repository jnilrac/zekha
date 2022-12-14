import React, { useState, useRef, useEffect } from 'react';
import ReactQuill, {Quill, handlers} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Divider, Input, Row, Button, Col, Space } from 'antd';

const Editor = ({post,uid, state, submitButton, stepper}) => {
  const [template, setTemplate] = state;
  const [finalPost, setFinalPost] = post;
  const [ submitDisabled, setSubmitDisabled ] = submitButton;
  const [step, setStep] = stepper;
 console.log(uid)

 if(submitDisabled){
  setSubmitDisabled(false);
 }
  const data = () => {
    
      const title = `<h1>${template.title.topic}</h1>`;
      const heroimage = `<img src=${template.heroImage.url} />`;
      const introProblem = `<p>${template.intro.problem}</p>`;
      const introBenefit = `<p>${template.intro.introBenefit}</p>`;

      const subheadings = template.subheadings.map((sub) => {
        const subheadingImage = `<img src=${sub.subheadingImage} />`;
        const subheadingTitle =  `<h3>${sub.subheadingTitle}</h3>`;
        const clearBenefit = `<p>${sub.clearBenefit}</p>`;
        const actionItems = `<p>${sub.actionItems}</p>`
        return (
          `<div class="hello">${subheadingImage}</div>
          <br />
           ${subheadingTitle}
           <br />
           ${clearBenefit}
           <br />
           ${actionItems}
           <br />
          `
        );
      
        
      })
      const conclusion = `<p>${template.conclusion}</p>`

      return (
       `
      
        ${introProblem}
        <br />
        ${introBenefit}
        <br />
        ${subheadings}
        <br />
        ${conclusion}

       `
      );
    
  }
  const [value, setValue] = useState(data);
  console.log(value)
  const quillRef = useRef(null);
  console.log(quillRef)
  
 
  

  

function insertToEditor(url) {
  quillRef.current.unprivilegedEditor.getEditor().insertEmbed(null, "image", url);
}
 const  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link','image '
  ]
  const modules = {
    toolbar: [
      [{ 'header': [1, 2,3,4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'video','image'], [{ 'align': [] }],
      ['clean']
    ],
    
  }
  
useEffect(()=>{
    const postDelta = quillRef.current.unprivilegedEditor.getContents();
    setFinalPost(postDelta);
    console.log(postDelta);
},[value])
  return (
    <>
    <Row justify='center'> 
    <Space>
        <Col >
        <Button size="large" onClick={() =>{setStep(3)}} type="primary">Prev</Button>
        </Col>
    </Space>
    </Row>
     <Divider />
    <Row justify='center'><h1>{template.title.topic}</h1></Row>
    <Divider />
    <Row justify='center'><img style={{maxWidth:600, paddingBottom:50}} src={template.heroImage.url} /></Row>
    <ReactQuill ref={quillRef} theme="snow" modules={modules}  value={value} onChange={setValue} />
    </>
    
  )
}

export default Editor