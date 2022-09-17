import React, { useState, useRef, useEffect } from 'react';
import ReactQuill, {Quill, handlers} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Divider, Input, Row } from 'antd';
import {db} from '../../../../services/firebase'
import {doc, getDoc, updateDoc, collection} from 'firebase/firestore'

const ExistingPostEditor = ({editPost, post}) => {
  const [value, setValue] = useState({});
  const [editedPost, setEditedPost] = editPost;
  console.log(value)
  
  // Quill Config
  const quillRef = useRef(null);

  const  formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]
  const modules = {
    toolbar: [
      [{ 'header': [1, 2,3,4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'], [{ 'align': [] }],
      ['clean']
    ],
    
  }

useEffect(()=>{
       //Populate Quill
        const getPost = async () => {
            console.log(post)
            const docRef = doc(db, "posts", post);
            const docSnap = await getDoc(docRef);
            const snapTitle = docSnap.data().title;
            const snapContent = docSnap.data().content;

            if (docSnap.exists()) {
            const postContentDelta = JSON.parse(snapContent);
            
            setValue(value => ({...value, title:snapTitle, content: postContentDelta}))
            console.log(postContentDelta)
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            }
        };
        getPost();

    },[post])

useEffect(()=>{
    const postDelta = quillRef.current.unprivilegedEditor.getContents();
    setEditedPost((editedPost)=>({...editedPost, title:value.title, content:postDelta}));
    
},[value])

  return (
    <>
    <Row justify='center'><Input value={value.title} onChange={(e)=>{ setValue(value =>({...value, title:e.target.value}))}}/></Row>
    <Divider />
    <ReactQuill ref={quillRef} theme="snow" modules={modules}  value={value.content} onChange={(e) =>{setValue(value =>({...value, content:e}))}} />
    </>
    
  )
}

export default ExistingPostEditor;