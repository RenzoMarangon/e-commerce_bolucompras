import React from 'react'
import logo from '../img/logo.png'
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
const NavBar = () => {
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
    <header>
        <div className='header-container'>
            <div className='header-container__logo'>
                <img src={logo} />
                <h1>Bolucompras</h1>
                <Button onClick={abrirMenu}>
                  <FontAwesomeIcon className='header-container__logo-hamburguesa' icon={faBars} />
                </Button>
            </div>

            <div className='header-container__links'>
                <Button className='header-container__links-btn' href="#">Inicio</Button>
                <Button className='header-container__links-btn' href="#">Ofertas</Button>
                <Button className='header-container__links-btn' href="#">Categorías</Button>
            </div>
        </div>
    </header>
  )
}

export default NavBar