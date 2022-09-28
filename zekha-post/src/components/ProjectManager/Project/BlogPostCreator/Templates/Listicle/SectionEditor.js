import React, { useState, useRef, useEffect } from 'react';
import ReactQuill, {Quill, handlers} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Divider, Input, Row } from 'antd';

const SectionEditor = ({value, onChange, text, section}) => {
const [quillText, setQuillText] = text;
const quillRef = useRef(null);
 const  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 
  ]
  const modules = {
    toolbar: [
      [{ 'header': [1, 2,3,4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'], [{ 'align': [] }],
      ['clean']
    ],
    
  }

  useEffect(()=>{
   
   console.log(quillRef.current.unprivilegedEditor.getText())
   setQuillText(draft => {draft[section] = quillRef.current.unprivilegedEditor.getText()})
  })
  
  return (
    <ReactQuill ref={quillRef} theme="snow" modules={modules}  value={value} onChange={onChange} /> 
  )
}

export default SectionEditor