/*HOOKS*/
import React,{ useState, useContext, useEffect } from 'react'
import LoginContext from '../../context/LoginContext'
import { useNavigate, Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';


/*Firebase*/
import db,{ app } from '../../utils/firebase';
import { signInWithEmailAndPassword, getAuth,  } from 'firebase/auth'
import {  collection, getDocs, setDoc, doc } from 'firebase/firestore';


/*Material UI*/
import { Button, TextField, Divider } from '@mui/material';


const UserLoginByMail = () => {

    const { setUserProvider } = useContext(LoginContext);

    const { cartWidgetItems, addItemToCart } = useContext(CartContext);

    const [ inputValue, setInputValue ] = useState({
        name:'',
        mail:'',

    });

    /*Guardo lo que voy a escribir en la alerta*/
    const [ alertContent, setAlertContent ] = useState({
        content:'',
        severity:'success',
    })
    

    const userLoginByMail    = (e) => {

        e.preventDefault();

        const email = inputValue.mail;
        const password = inputValue.password;

        const auth = getAuth(app);

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
            // Signed in
            userExist( email ) 

        })
        .catch((error) => {
            console.log(error)
        });
    }



    const userExist = async( id ) =>{
        const usersColl = collection(db,'users');
        const usersList = await getDocs( usersColl );

        let userData = false;

        usersList.docs.forEach((user)=>{
            if( user.id == id ){
               const us = user.data();
                setUserProvider( us )
                userData=true;
            }
        })

        userData && itemRegister(id);
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

    const inputEnter = (e) => {
        const { name, value } = e.target;
        setInputValue({
          ...inputValue,
          [name]:value,
        })
      }



    
    

return (
    <>
        <form className='userLogin-form' onSubmit={ userLoginByMail } >
            <TextField className='userLogin-form__input' label="Mail" type="email" name='mail' onChange={inputEnter} value={inputValue.mail}  required />
            <TextField className='userLogin-form__input' label="Contraseña" type="password" name='password' onChange={inputEnter} value={inputValue.password}  required />
            
            <Button type='submit'>
                Iniciar Sesión
            </Button>

            <Divider />

        </form>
    </>
)
}

export default UserLoginByMail;