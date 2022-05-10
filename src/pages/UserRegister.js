/*HOOKS*/
import React from 'react'

/*Components*/
import UserLoginByGoogle from '../components/UserLoginByGoogle/UserLoginByGoogle';
import UserRegisterByMail from '../components/UserRegisterByMail/UserRegisterByMail';

/*Material UI*/
import Divider from '@mui/material/Divider';

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