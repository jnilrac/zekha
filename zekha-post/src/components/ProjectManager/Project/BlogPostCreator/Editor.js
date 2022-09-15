import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Divider, Input, Row } from 'antd';

const Editor = ({state}) => {
  const [template, setTemplate] = state;

  const data = () => {
    
      const title = `<h1>${template.title.topic}</h1>`;
      const heroimage = `<img src=${template.heroimage} />`;
      const introProblem = `<p>${template.intro.problem}</p>`;
      const introBenefit = `<p>${template.intro.introBenefit}</p>`;

      const subheadings = template.subheadings.map((sub) => {
        const subheadingImage = `<img src=${sub.subheadingImage} />`;
        const subheadingTitle =  `<h3>${sub.subheadingTitle}</h3>`;
        const clearBenefit = `<p>${sub.clearBenefit}</p>`;
        const actionItems = `<p>${sub.actionItems}</p>`
        return (
          `${subheadingImage}
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
        ${heroimage}
        <br />
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
  console.log(quillRef.current.unprivilegedEditor.getContents())
  const modules = {
    toolbar: [
      [{ 'header': [1, 2,3,4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'], [{ 'align': [] }],
      ['clean']
    ],
  }

 const  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
  
  //const editor = quillRef.getEditor();
  //const unprivilegedEditor = quillRef.makeUnprivilegedEditor(editor);
 // console.log(unprivilegedEditor)
  return (
    <>
    <Row justify='center'><h1>{template.title.topic}</h1></Row>
    <Divider />
    <ReactQuill ref={quillRef} theme="snow" modules={modules}  value={value} onChange={setValue} />
    </>
    
  )
}

export default Editor