/*Hooks*/
import React from 'react'
import { Link } from 'react-router-dom'

/*Images*/
import error from '../img/error.png'

const Error = () => {
  return (
    <div className='error-container'>
        <Link to={'/'}><img src={error} /></Link>
    </div>
    
  )
}

export default Error