/*HOOKS*/
import React, { useContext, useEffect, useState } from 'react'
import LoginContext from '../../context/LoginContext';
import CartContext from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

/*Firebase*/
import db,{ app } from '../../utils/firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged  } from "firebase/auth";
import { getDocs, doc, collection, setDoc,  } from "firebase/firestore"

/*Material UI*/
import { Button } from '@mui/material';



const UserLoginByGoogle = () => {

    const { setUserProvider } = useContext(LoginContext);

    const { cartWidgetItems, totalAddCartItemCount, addItemToCart } = useContext(CartContext);

    const navigate = useNavigate()

     const googleAuth = async() => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      signInWithPopup( auth, provider )
      .then(( result ) =>{
        const { email, displayName, photoURL } = result.user
        const us = {
          name:displayName,
          mail:email,
          image:photoURL,
        }
        
        setUserProvider( us )

        /*Guardo los datos en la DB*/
        userRegister(email, us)

        /*Si había un carrito antes de que el usuario
        se loguee, entonces guardo el carrito*/
        if( totalAddCartItemCount() > 1 ) {
          itemRegister( email )
        }

        navigate("/");

      })
  }   


  const userRegister = async( userId, userData ) => {
      const userCollection = collection(db,'users');
      const userDoc = doc( db, 'users', userId )
      const addUserToFirestore = await setDoc( userDoc, userData )
    }

  /*Guardo los datos de la consola en fireStore*/
  const itemRegister = async( userID ) => {

    const cartsCollection = collection(db, 'carritos');
    const cartsList = await getDocs(cartsCollection)

    cartsList.docs.map(( cart )=>{
      
        if( cart.id == userID ){
          const objetosGuardados = Object.values( cart.data() ) 
          objetosGuardados.map(( item )=>{
            
            addItemToCart( item )
          })
        }
    })
    
    const itemsListToObject = Object.assign({},cartWidgetItems);

    const itemCollection = collection(db,'carritos');
    const itemDoc = doc( db, 'carritos', userID )
    const addItemToFirestore = await setDoc( itemDoc, itemsListToObject )

  }


  return (
    <div className='google-button-container'>
      
      <Button className='google-button' onClick={ googleAuth } > 
        <img src='./images/google.svg' />
        Google 
      </Button>

    </div>
  )
}

export default UserLoginByGoogle