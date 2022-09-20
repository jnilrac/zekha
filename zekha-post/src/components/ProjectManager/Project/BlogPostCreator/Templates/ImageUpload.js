import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { storage } from '../../../../../services/firebase';
import {getDownloadURL, ref, uploadBytes, deleteObject} from 'firebase/storage';
import React, {useState, useEffect} from 'react';




const ImageUpload = ({handleUpdate ,uid}) => {
        const [uploadState, setUploadState ] = useState({loading: false, imageUrl:''})
        const {imageUrl} = uploadState;
        const [removeableFile, setRemoveableFile] =  useState(null);
       console.log(removeableFile)
      

        const beforeUpload = async (file, fileList) => { 
            if(removeableFile !== null) {
                //const removeImageRef = ref(storage, `images/${uid}/${removeableFile.name}`)
                await deleteObject(removeableFile).then(() => {       
                  setUploadState(uploadState => ({...uploadState, imageUrl:''}));
                 
                   // File deleted successfully
                 }).catch((error) => {
                   // Uh-oh, an error occurred!
                 });
            }
          const isImage = file.type.includes('image')
          if (!isImage) {
            message.error(`${file.name} is not an accepted image file`);
          }
          
            
          return (isImage) || (Upload.LIST_IGNORE);
        }

        const customUpload = async ({ onError, onSuccess, file }) => {
            const imageRef = ref(storage, `images/${uid}/${file.name}`)
            const metadata = {
                contentType: file.type
            }

            try {
              const image = await uploadBytes(imageRef, file).then((snapshot) => {console.log('Uploaded a blob or file!');});
              setRemoveableFile(imageRef);
              onSuccess(null, image);
             
            } catch(e) {
              onError(e);
            }
          };

        const handleChange = async (info) => {
     
            if (info.file.status === 'uploading') {
              setUploadState(uploadState => ({...uploadState, loading: true }));
              return;
            }
            if (info.file.status === 'done') {
              
                const imageRef = ref(storage, `images/${uid}/${info.file.name}`)
                const thisImageUrl = await getDownloadURL(imageRef);
                handleUpdate(thisImageUrl,'heroImage')
               setUploadState(uploadState => ({...uploadState, imageUrl:thisImageUrl, loading: false}));
                
            }
          };

        const handleRemove = async (file) => {
           
        const removeImageRef = ref(storage, `images/${uid}/${file.name}`)
        
            await deleteObject(removeImageRef).then(() => {       
               setUploadState(uploadState => ({...uploadState, imageUrl:''}));
              
                // File deleted successfully
              }).catch((error) => {
                // Uh-oh, an error occurred!
              });
              handleUpdate('','heroImage');
              setRemoveableFile(null);
              
        }
    
 return(
    <Upload
          beforeUpload={beforeUpload}
          onChange={handleChange}
          customRequest={customUpload} 
          onRemove ={handleRemove}
          maxCount={1}
          
    >
    <Button icon={<UploadOutlined />}>Upload Image</Button>
  </Upload>
 );
};

export default ImageUpload;