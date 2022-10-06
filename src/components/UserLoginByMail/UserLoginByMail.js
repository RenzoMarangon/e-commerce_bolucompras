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
import { Button, TextField, Divider, FormControl } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';


const UserLoginByMail = () => {

    const { setUserProvider } = useContext(LoginContext);

    const { cartWidgetItems, addItemToCart } = useContext(CartContext);

    const [ inputValue, setInputValue ] = useState({
        name:'',
        mail:'',
        showPassword:false,
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


      //OJO

      const handleClickShowPassword = () => {
        setInputValue({
          ...inputValue,
          showPassword: !inputValue.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };


return (
    <>
        <form className='userLogin-form' onSubmit={ userLoginByMail } >
            

            <FormControl className='userLogin-form__input'>
                <InputLabel htmlFor="userMail">Email</InputLabel>
                <OutlinedInput id='userMail' label="Mail" type="email" name='mail' onChange={inputEnter} value={inputValue.mail}  required />
            </FormControl>          

            <FormControl className='userLogin-form__input'>
                <InputLabel htmlFor="userPass">Contraseña</InputLabel>
                <OutlinedInput id='userPass'  label="Contraseña" name='password' onChange={inputEnter} value={inputValue.password}  required
                    //OJO
                    type={ inputValue.showPassword ? 'text' : 'password'}

                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {inputValue.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    } 
                />
            </FormControl>
            
            <Button type='submit'>
                Iniciar Sesión
            </Button>

            <Divider />

        </form>
    </>
)
}

export default UserLoginByMail;