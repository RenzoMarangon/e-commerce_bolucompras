import React from 'react'
import Divider from '@mui/material/Divider';
import UserLoginByGoogle from '../components/UserLoginByGoogle/UserLoginByGoogle';
import UserRegisterByMail from '../components/UserRegisterByMail/UserRegisterByMail';

const UserRegister = () => {
  return (
    <div className='userRegisterPage-container'>
        <h2>Registrate</h2>
        <UserRegisterByMail />
        <div className='userPage-divider'>
          <span></span>
          <p>ó</p>
          <span></span>
        </div>

      <div className='google'>
        <UserLoginByGoogle />
      </div>
    </div>
  )
}

export default UserRegister