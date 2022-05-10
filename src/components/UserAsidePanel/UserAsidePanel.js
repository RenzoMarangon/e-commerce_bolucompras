/*HOOKS*/
import React, { useContext } from 'react'
import LoginContext from '../../context/LoginContext'

/*Material UI*/
import { Input } from '@mui/material'

const UserAsidePanel = () => {

    const { userProvider } = useContext( LoginContext )
    
  return (
    <div className='userAsidePanel-container'>
        <img src={`${ userProvider.image }`} />
        <h2>{ userProvider.name }</h2>
        <div className='userAsidePanel-datos'>
          <p><span>Tus datos</span></p>
          <p><span>Dirección:</span> Calle falsa 123</p>
          <p><span>Teléfono:</span> 11-2233-4455 </p>
          <p><span>E-Mail:</span> { userProvider.mail }</p>
          <p><span>DNI:</span> 38.373.635 </p>
        </div>
    </div>
  )
}

export default UserAsidePanel;