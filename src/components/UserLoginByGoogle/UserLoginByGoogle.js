import React, { useContext, useEffect, useState } from 'react'
import db,{ app } from '../../utils/firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged  } from "firebase/auth";
import LoginContext from '../../context/LoginContext';
import CartContext from '../../context/CartContext';
import { Button } from '@mui/material';
import { getDocs, doc, collection, setDoc,  } from "firebase/firestore"


const UserLoginByGoogle = () => {

    const {userProvider, setUserProvider } = useContext(LoginContext);

    const { cartWidgetItems, totalAddCartItemCount, setCartWidgetItems, clearCartWidget } = useContext(CartContext);

    const [ itemsInCart, setItemsInCart ] = useState([]);


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

        userRegister(email, us)

        if( totalAddCartItemCount() > 1 ) {
          console.log(email)
          itemRegister( email, cartWidgetItems )
        }


      })
  }   


  const userRegister = async( userId, userData ) => {
      const userCollection = collection(db,'users');
      const userDoc = doc( db, 'users', userId )
      const addUserToFirestore = await setDoc( userDoc, userData )
      console.log('registro etsitoso')
    }


  /*Traigo lo que ya este guardado en fireStore*/




  /*Guardo los datos de la consola en fireStore*/
  const itemRegister = async( userID, cartWidgetItems ) => {

    const cartsCollection = collection(db, 'carritos');
    const cartsList = await getDocs(cartsCollection)

    const arrayItemsInCart = []
    
    cartsList.docs.forEach(( cart )=>{
        if( cart.id == userProvider.mail ){

          arrayItemsInCart.concat( Object.values( cart.data() ));
        }
    })

    console.log(arrayItemsInCart)
    const newCartList = arrayItemsInCart.concat( cartWidgetItems )

    const arrayToObject = Object.assign({}, newCartList);

    

    const itemCollection = collection(db,'carritos');
    const itemDoc = doc( db, 'carritos', userID )
    const addItemToFirestore = await setDoc( itemDoc, arrayToObject )

    console.log('registro etsitoso')

  }

 



  return (
    <>
      <Button onClick={ googleAuth }> Ingresar con Google </Button>
    </>
  )
}

export default UserLoginByGoogle