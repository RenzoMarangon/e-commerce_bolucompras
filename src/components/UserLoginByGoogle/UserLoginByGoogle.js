import React, { useContext, useEffect, useState } from 'react'
import db,{ app } from '../../utils/firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged  } from "firebase/auth";
import LoginContext from '../../context/LoginContext';
import { Button } from '@mui/material';
import { getDocs, doc, collection, setDoc, query, where,  } from "firebase/firestore"


const UserLoginByGoogle = () => {

    const { userProvider, setUserProvider } = useContext(LoginContext);

     /*Si se loguea con google, userMatch pasa a true y llama al useEffect*/
     const [ userMatch, setUserMatch ] = useState( true );

     useEffect(()=>{
       /*Pregunto si el usuario existe en la base de datos, si no existe lo crea*/
       if(userMatch == false){
        const mail = userProvider.mail;
        userRegister( mail, userProvider );
       }
  
 
     },[userMatch]);

     const googleAuth = async() => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      signInWithPopup( auth, provider )
      .then(( result ) =>{
        const { email, displayName, photoURL } = result.user
        const us = {
          name:displayName,
          mail:email,
          image:photoURL,
        }

        setUserProvider( us )
      })
  }   


  const userRegister = async( userId, userData ) => {
      const userCollection = collection(db,'users');
      const userDoc = doc( db, 'users', userId )
      const addUserToFirestore = await setDoc( userDoc, userData )
      console.log('registro etsitoso')
    }

  const userExist = async( id ) =>{
      const usersColl = collection(db,'users')
      const q = query(usersColl, where('mail', '==', id));
      const getUsers = await getDocs( q );
      
      let userMatch = false;


      getUsers.docs.forEach(( user )=>{
        if (user.id == id) {
          userMatch = true;
        } 
      })

      setUserMatch(userMatch);
  }


  return (
    <>
      <Button onClick={ googleAuth }> Ingresar con Google </Button>
    </>
  )
}

export default UserLoginByGoogle