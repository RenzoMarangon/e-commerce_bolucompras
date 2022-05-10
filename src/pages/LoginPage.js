/*Hooks*/
import React from 'react';
import { Link } from 'react-router-dom';

/*Components*/
import UserLoginByMail from '../components/UserLoginByMail/UserLoginByMail';
import UserLoginByGoogle from '../components/UserLoginByGoogle/UserLoginByGoogle';

/*Material UI*/
import { Button } from '@mui/material';

const LoginPage = () => {
 
  return (
    <div className='loginPage-container'>
      <h1>Iniciar sesión</h1>
      <UserLoginByMail  />
    
      <div className='divider'>
        <span className='linea'></span>
        <p>ó</p>
        <span className='linea'></span>
      </div>
      <UserLoginByGoogle className='google'/>

    <Link to={'/UserRegister'}>
      <Button>
        No tengo una cuenta
      </Button>
    </Link>

    </div>
  )
}

export default LoginPage