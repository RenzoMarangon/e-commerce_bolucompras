import React, { useContext } from 'react'
import LoginContext from '../../context/LoginContext'
import ImageUploader from '../ImageUploader/ImageUploader';

const UserSettings = () => {

    const { userProvider } = useContext(LoginContext);
    const { name, image, mail } = userProvider;

  return (
    <div className='userSettings-container'>
        <div>
            <h3>{ name }</h3>
            <img src={`${ image }`} alt={`${ name }`} />
            <p>{ mail }</p>

            <ImageUploader />
            
        </div>

    </div>
  )
}

export default UserSettings