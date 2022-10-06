/*HOOKS*/
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import LoginContext from '../../context/LoginContext'
import CartContext from '../../context/CartContext';

/*Components*/
import logo from '../../img/logo.png'
import CartWidget from '../CartWidget/CartWidget';
import UserMenu from '../UserMenu/UserMenu';
import UserLogOut from '../UserLogOut/UserLogOut';

/*Material UI*/
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import ShopIcon from '@mui/icons-material/Shop';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

/*Font Awesome*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCircleUser  } from '@fortawesome/free-solid-svg-icons'

/*Firebase*/
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../utils/firebase';

const NavBar = () => {

    const { userProvider, setUserProvider } = useContext(LoginContext);

    const { setCartWidgetItems, cartWidgetItems } = useContext( CartContext );

    const [ userData, setUSerData ] = useState(false);

    const [ showLinks, setShowLinks ] = useState(true);

    const [ itemsInCart, setItemsInCart ] = useState(0);
    
    
    useEffect( () =>{
      
      getUser();
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

    /*Si el tamaño de la pantalla es menor a 450px 
    muestro el menu responsive*/
    const showHideMenu =()=>{
      const width = document.body.clientWidth;
      width<=450 ? setShowMenu(true) :  setShowMenu(false);
      width<=450 && setShowLinks(false);
    }

    /*Me fijo si el usuario está logueado
    si es así guardo los datos*/
    const getUser = () => {
      const auth = getAuth()
      onAuthStateChanged( auth, ( user ) => {
       if( user != null){
          showUser(user.email)
          setUSerData(true)
       } 
      })
    }

    /*Busco el usuario en la base de datos
    y traigo sus datos para guardarlos
    en el User PRovider*/

    const showUser = async( id ) => {
      const auth = getAuth();
      const usersCollection = collection(db, 'users');
      const usersDocs = await getDocs( usersCollection )

      usersDocs.docs.forEach(( user )=>{
        if( user.data().mail == id ){
          const userData = user.data();

          setUserProvider( userData );
        }
      })
    }

    //Buscar productos
    const searchProducts = () =>{
      console.log('asdddd')
    }

    //Barra de búsqueda
    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    }));
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
    
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        cursor:'pointer',
        [theme.breakpoints.up('sm')]: {
          width: '7.5ch',
          '&:focus': {
            width: '15ch',
          },
        },
      },
    }));
  return (

    <header >
        <div className='header-container' >
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
            
              <Search  className='header-container__links-link'>
                <SearchIconWrapper >
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase 
                  placeholder="Buscar…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>

              <div className='header-container__links-link' >
                {/*Boton que muestra la imagen de perfil
                  y contiene el menu del usuario, 
                  si encuentra los datos del usuario los muestra
                  sino, muestra un boton de registro y los input para loguearse*/}
                  
                  <Button>
                  <UserMenu>
                        {
                          userData ? (
                          <div className='userMenu-container' style={ {padding:'5px'}}>
                            <p className='name' > { `${userProvider.name}` }</p>
                            <Link to={'/UserPanel'}>
                              <Button><SettingsIcon /><span> Configuración </span></Button>
                            </Link>

                            <Link to={'/UserTickets'}>
                              <Button><ShopIcon /> <span>Mis compras </span></Button>
                            </Link>
                            <UserLogOut />
                          </div>
                          ) : (
                          <div style={ {padding:'5px'}}>
                            <Link to={'/LoginPage'} style={{display:'block'}}>
                                <Button>Iniciar sesión</Button>
                            </Link>

                            <Link to={'/UserRegister'} >
                                <Button>Registrarse</Button>
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