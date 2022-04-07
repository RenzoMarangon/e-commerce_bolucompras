import React from 'react';
import Button from '@mui/material/Button';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

const CartWidget = ({ cartStock }) =>{
    return(
        <Button className='header-container__links-btn'>
            <FontAwesomeIcon icon={ faCartShopping } className="header-container__links-carrito" />
            <p>{cartStock}</p>
        </Button>
    )
}

export default CartWidget;