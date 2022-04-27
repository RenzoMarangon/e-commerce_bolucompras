import React, { createContext, useState } from 'react'

const LoginContext = createContext();

const LoginProvider = ({ children }) => {

    const [ userProvider, setUserProvider ] = useState({
        name : ' ',
        mail : ' ',
        image : ' ',
    });


    const data = {
        userProvider,
        setUserProvider,
    }


  return (
    <LoginContext.Provider value = {data}>
        {children}
    </LoginContext.Provider>
  )
}

export { LoginProvider };
export default LoginContext;