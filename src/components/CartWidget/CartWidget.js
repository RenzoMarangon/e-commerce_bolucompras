import React,{ useContext } from 'react';
import Button from '@mui/material/Button';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext'


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const CartWidget = () =>{

    /*Cart context*/
    const { cartWidgetItems } = useContext(CartContext);

    /*Menu de CartWidget*/

    const [anchorCartWidget, setAnchorCartWidget] = React.useState(null);
    const openCartWidget = Boolean(anchorCartWidget);

    const handleOpenCartWidget = (event) => {
        setAnchorCartWidget(event.currentTarget);
    };

    const handleCloseCartWidget = () => {
        setAnchorCartWidget(null);
    };


    return(
        <>
            <Button onClick={handleOpenCartWidget}  className='header-container__links-btn'>
                <FontAwesomeIcon icon={ faCartShopping } className="header-container__links-carrito" />
                <p>{cartWidgetItems.length}</p>
            </Button>

            {/*MENU*/}

            <Menu id="basic-menu" anchorEl={anchorCartWidget} open={openCartWidget} onClose={handleCloseCartWidget}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            >
                {cartWidgetItems.map(( cartWidgetItem )=>{
                    return(
                        <MenuItem key={cartWidgetItem.id} className='header-container__menu-item' onClick={handleCloseCartWidget}>
                            <p>{cartWidgetItem.title}</p>
                            <p>Price: {cartWidgetItem.price}</p>
                            <p> Stock:{cartWidgetItem.stockCount}</p>
                        </MenuItem>
                    )
                })}
            </Menu>
        </>
            
        
    )
}

export default CartWidget;