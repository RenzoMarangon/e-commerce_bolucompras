import { Button } from '@mui/material'
import React,{ useState } from 'react'
import UserLoginByGoogle from '../components/UserLoginByGoogle/UserLoginByGoogle'
import UserRegisterByMail from '../components/UserRegisterByMail/UserRegisterByMail'
import UserSettings from '../components/UserSettings/UserSettings'
import UserOrders from '../components/UserOrders/UserOrders'
import UserAsidePanel from '../components/UserAsidePanel/UserAsidePanel'

const UserPanel = () => {

  return (
    <div className='userPanel-container'>

          <UserAsidePanel className='userPanel-userAsidePanel'/>

          <UserSettings className='userPanel-userSettings'/>

    </div>
  )
}

export default UserPanel