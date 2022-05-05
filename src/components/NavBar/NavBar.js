import React, { useEffect, useState, useContext } from 'react'
import logo from '../../img/logo.png'
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircleUser  } from '@fortawesome/free-solid-svg-icons'
import CartWidget from '../CartWidget/CartWidget';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import LoginContext from '../../context/LoginContext'
import { collection, getDocs } from 'firebase/firestore';
import db from '../../utils/firebase';
import UserMenu from '../UserMenu/UserMenu';
import UserLoginByMail from '../UserLoginByMail/UserLoginByMail';
import UserLoginByGoogle from '../UserLoginByGoogle/UserLoginByGoogle'
import UserLogOut from '../UserLogOut/UserLogOut';

const NavBar = () => {



    const { userProvider, setUserProvider } = useContext(LoginContext);

    const [ userData, setUSerData ] = useState(false);

    const [ showLinks, setShowLinks ] = useState(true)
    
    useEffect( () =>{
      
      getUser()
      showHideMenu();

    },[])


    /*Mostrar u ocultar los links en pantalla de celular*/
    const abrirMenu=()=>{
        setShowLinks(!showLinks)
        const header = document.querySelector('.header-container');
        setShowLinks ? header.style.height='100%': header.style.height='10vh';
      }
  

    /*Mostrar u ocultar menu hamburguesa segun el tamaño de la pantalla*/
    const [ showMenu, setShowMenu ] = useState(true);

    const showHideMenu =()=>{
      const width = document.body.clientWidth;
      width<=450 ? setShowMenu(true) :  setShowMenu(false);
      width<=450 && setShowLinks(false);
    }

    const getUser = () => {
      const auth = getAuth()
      onAuthStateChanged( auth, ( user ) => {
       if( user != null){
          showUser(user.email)
          setUSerData(true)
       } 

      })
    }

    const showUser = async( id ) => {
      const auth = getAuth();
      const usersCollection = collection(db, 'users');
      const usersDocs = await getDocs( usersCollection )

      usersDocs.docs.forEach(( user )=>{
        if( user.data().mail == id ){
          const userData = user.data();

          setUserProvider(userData);
        }
      })
    }

  
  return (

    
    <header >

        <div className='header-container'>
            <div className='header-container__logo'>
            
                <img src={ logo } />
                <h1>Bolucompras</h1>
                
                {/* Pregunto si el DOM tiene cierto tamaño, si es asi borro el menu hamburguesa */}
                { showMenu && 
                <Button onClick={ abrirMenu }>
                  <FontAwesomeIcon className='header-container__logo-hamburguesa' icon={ faBars } />
                </Button> }

            </div>

            { showLinks && 
            
            <div className='header-container__links'>
              
              <Link to={'/'} className='header-container__links-link' >
                <Button> Inicio </Button>
              </Link>


              <Link to={'/Offers'} className='header-container__links-link' >
                  <Button>Ofertas</Button>
              </Link>

              <Link to={'/Categorys'} className='header-container__links-link' >
                  <Button>Categorias</Button>
              </Link>

              <Link to={'/Contact'} className='header-container__links-link' >
                  <Button>Contacto</Button>
              </Link>
        
              <div className='header-container__links-link' >
                <CartWidget className=' header-container__links-cartWidget'/>
              </div>
            


              <div className='header-container__links-link' >
                  <Button>

                  <UserMenu className='header-container__userMenu'>
                      
                        
                        {
                          userData ? (
                          <div>
                            <p> { `${userProvider.name}` }</p>
                            <Link to={'/UserSettings'}>
                              <Button> Configuración </Button>
                            </Link>
                            <UserLogOut />
                          </div>
                          ) : (
                          <div>
                            <UserLoginByMail />
                            <UserLoginByGoogle />
                            <Link to={'/UserRegister'} className='userLogin-__register-button'>
                                <Button>No tengo una cuenta</Button>
                            </Link>
                          </div>
                          )

                        }
                      
                      
                                                
  
                  </UserMenu>
                  

                  </Button>
              </div>
            </div>  
            }
          
        </div>
    </header>
  )
}

export default NavBar