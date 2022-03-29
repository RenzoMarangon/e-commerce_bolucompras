import React, { useEffect, useState } from 'react'
import logo from '../../img/logo.png'
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import CartWidget from '../CartWidget/CartWidget';


const NavBar = () => {


  /*Mostrar u ocultar menu hamburguesa segun el tamaño de la pantalla*/
  const [ showMenu, setShowMenu ] = useState(true);

  const showHideMenu =()=>{
    const width = document.body.clientWidth;
    width<=450 ? setShowMenu(true) :  setShowMenu(false);
  }

  useEffect( () =>{
    showHideMenu();
  },[])


  /*Mostrar u ocultar los links en pantalla de celular*/
  const abrirMenu=()=>{
    const menu = document.querySelector('.header-container__links')
    const alturaMenu = menu.scrollHeight;
    const alturaActual = menu.clientHeight;
    if(alturaActual==0){
      menu.style.height=alturaMenu+"px";
    }else{
      menu.style.height="0";
    }
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

            <div className='header-container__links'>
              <CartWidget cartStock={ 0 } />
              <Button className='header-container__links-btn' href="#">Inicio</Button>
              <Button className='header-container__links-btn' href="#">Ofertas</Button>
              <Button className='header-container__links-btn' href="#">Categorías</Button>
          
          </div>
        </div>
    </header>
  )
}

export default NavBar