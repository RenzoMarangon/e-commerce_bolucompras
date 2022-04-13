import React,{ useContext } from 'react';
import Button from '@mui/material/Button';
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartContext from '../../context/CartContext'


import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';

const CartWidget = () =>{

    /*Cart context*/
    const { cartWidgetItems, removeCartItem, cartItemCount } = useContext(CartContext);

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
            <Button onClick={handleOpenCartWidget} startIcon={<FontAwesomeIcon icon={ faCartShopping } />}  className='header-container__links-btn'>
                <p>{ cartItemCount() }</p>
            </Button>

            {/*MENU*/}

            <Menu id="basic-menu" anchorEl={anchorCartWidget} open={openCartWidget} onClose={handleCloseCartWidget}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}>
                <div>
                    {
                        cartWidgetItems<=0 ? (
                            <p>No hay productos en el carrito</p>

                        ) : (

                            <>
                            {
                            cartWidgetItems.map(( cartWidgetItem )=>{
                                return(
                                    <div key={cartWidgetItem.id} className='header-container__menu-item' onClick={handleCloseCartWidget}>
                                        <p>{cartWidgetItem.title}</p>
                                        <p>Price: {cartWidgetItem.price}</p>
                                        <p>Stock:{cartWidgetItem.stockCount}</p>
                                        <Button onClick={ () => { removeCartItem(cartWidgetItem.id) } }> 
                                            <FontAwesomeIcon icon={ faTrashCan }/>
                                        </Button>
                                    </div>
                                )
                            })
                            } 

                            <div className='header-container__pay'>
                                <Button>
                                    <Link to='/Cart'>
                                        Terminar compra
                                    </Link> 
                                </Button>
                            </div>     
                            </>
                        )
                    }
                </div>
            </Menu>
        </>
            
        
    )
}

export default CartWidget;