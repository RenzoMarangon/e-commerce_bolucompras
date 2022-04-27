import React,{ useState } from 'react';
import UserLoginByMail from '../components/UserLoginByMail/UserLoginByMail';
import UserLogOut from '../components/UserLogOut/UserLogOut';
import UserRegisterByMail from '../components/UserRegisterByMail/UserRegisterByMail';

const LoginPage = () => {
  const [ loged, setLoged  ] = useState(false);
  return (
    <>
      <UserRegisterByMail />
      <UserLoginByMail setLoged={setLoged} />
      <UserLogOut />
      {console.log(loged)}
    </>
  )
}

export default LoginPage