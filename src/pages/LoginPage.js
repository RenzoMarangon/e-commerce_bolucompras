import React from 'react';
import UserLoginByMail from '../components/UserLoginByMail/UserLoginByMail';
import Divider from '@mui/material/Divider';
import UserLoginByGoogle from '../components/UserLoginByGoogle/UserLoginByGoogle';
import { Button } from '@mui/material';
import UserRegister from './UserRegister';
import { Link } from 'react-router-dom';

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