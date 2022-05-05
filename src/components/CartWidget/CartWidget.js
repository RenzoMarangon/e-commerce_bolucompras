import React,{ useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartContext from '../../context/CartContext'

import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';


/*Firebase*/
import db,{ app } from '../../utils/firebase';
import { collection, getDocs, doc, setDoc  } from 'firebase/firestore';

import LoginContext from '../../context/LoginContext';


const CartWidget = () =>{

    const { userProvider } = useContext(LoginContext);


    const [ itemRemoved, setItemRemoved ] = useState( false );

    /*Cart context*/
    const { cartWidgetItems, removeCartItem, cartItemCount, setCartWidgetItems, clearCartWidget } = useContext(CartContext);

    useEffect(()=>{
        itemRemoved && deleteItemFromDB();
    },[itemRemoved])

    /*Menu de CartWidget*/
    const [anchorCartWidget, setAnchorCartWidget] = React.useState(null);
    const openCartWidget = Boolean(anchorCartWidget);

    const handleOpenCartWidget = (event) => {
        setAnchorCartWidget(event.currentTarget);
        getWidget()
    };

    const handleCloseCartWidget = () => {
        setAnchorCartWidget(null);
    };


    const getWidget = async() => {
        const cartsCollection = collection(db, 'carritos');
        const cartsList = await getDocs(cartsCollection)
        
        cartsList.docs.forEach(( cart )=>{
            if( cart.id == userProvider.mail ){

                const cartProductsArray = Object.values( cart.data() );
        
                setCartWidgetItems( cartProductsArray )

            }

        })
    }   

    const removeItemFromCart = async( itemID ) =>{

        removeCartItem(itemID)

        setItemRemoved( true );
    }


    const deleteItemFromDB = async() =>{
        const cartsCollection = collection(db, 'carritos');
        const cartsList = await getDocs(cartsCollection)

        const itemCollection = collection(db,'carritos');
        const itemDoc = doc( db, 'carritos', userProvider.mail )

        const cartWidgetItemsToObject = Object.assign({},cartWidgetItems)

        const addItemToFirestore = await setDoc( itemDoc, cartWidgetItemsToObject )
        console.log('item creado')

        setItemRemoved( false );
    }
    return(
        <>
            <Button onClick={handleOpenCartWidget} startIcon={<FontAwesomeIcon icon={ faCartShopping } />}  className='header-container__links-btn'>
                <p>{ cartItemCount() }</p>
            </Button>

            {/*MENU*/}

            <Menu
                anchorEl={anchorCartWidget}
                id="account-menu"
                open={openCartWidget}
                key={'menux'}
                onClose={handleCloseCartWidget}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <div className='cartWidget-container'>
                    {
                        cartWidgetItems<=0 ? (
                            <p>No hay productos en el carrito</p>

                        ) : (

                            <>
                            {
                            cartWidgetItems.map(( cartWidgetItem )=>{
                                return(
                                    <div key={cartWidgetItem.id} className='cartWidget-container__item'>
                                        <p>{cartWidgetItem.title}</p>
                                        <p>Price: {cartWidgetItem.price}</p>
                                        <p>Stock:{cartWidgetItem.stockCount}</p>
                                        <Button onClick={ () => {  removeItemFromCart( cartWidgetItem.id ) } }> 
                                            <FontAwesomeIcon icon={ faTrashCan }/>
                                        </Button>
                                    </div>
                                )
                            })
                            } 

                            <div className='header-container__pay'>
                                <Button onClick={ handleCloseCartWidget }>
                                    <Link to='/CartCheckout'>
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