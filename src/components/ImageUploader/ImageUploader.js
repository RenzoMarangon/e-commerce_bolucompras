/*HOOKS*/
import React, { useContext, useEffect, useState } from 'react'
import LoginContext from '../../context/LoginContext';

/*Firebase*/
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, collection, setDoc } from 'firebase/firestore';
import db, { app } from '../../utils/firebase';

/*Material UI*/
import { Button } from '@mui/material';


const ImageUploader = () => {

    const { userProvider, setUserProvider } = useContext(LoginContext);

    /*Hook que guarda la imágen*/
    const [ imageFile, setImageFile ] = useState({});

    /*Hook que guarda la URL de la imágen*/
    const [ URL, setURL ] = useState('');

    useEffect(()=>{
        /*Si se cargó la imágen entonces se actualizan los datos del usuario*/
        URL.length > 1 && userRegister(userProvider.mail, userProvider);
    },[URL])

    const inputSendImage = (e) => {
        const imgRef = e.target.files[0]
        setImageFile( imgRef )
    }

    /*Guardo la imagen en la base de datos*/
    const sendImage = () => {
        const strge = getStorage(app);
        const strgeageRef = ref(strge, `profilePictures/${ imageFile.name }`);
        
        /*Cuando se termine de subir la imagen,
            obtengo la URL*/
        uploadBytes(strgeageRef, imageFile).then(() => {
            getURL();   
        });
    }

    /*Cuando la imagen se cargue, hago una busqueda
    y traigo su URL, luego seteo los datos del
    usuario para agregarle la URL*/
    const getURL = () =>{
        const strge = getStorage(app);
        const strgeageRef = ref(strge, `/profilePictures/${imageFile.name}`);

        getDownloadURL(strgeageRef).then((url)=>{

            setUserProvider({
                ...userProvider,
                image:url
            })
            
            setURL(url);
           
        })

        
    }

    /*Cuando se agrega la URL al usuario, 
    se guarda la info en la base de datos*/
    const userRegister = async( userId, userData ) => {
        const userCollection = collection(db,'users');
        const userDoc = doc( db, 'users', userId )
        const addUserToFirestore = await setDoc( userDoc, userData )
    }


  return (
    <div className='imageUploader-container'>
        <input type='file' accept='.jpeg,.jpg,.svg,.png' placeholder='Subir imagen' name='image' onChange={ inputSendImage }  />
        <Button onClick={ sendImage }>
            Enviar
        </Button>
    </div>
  )
}

export default ImageUploader;