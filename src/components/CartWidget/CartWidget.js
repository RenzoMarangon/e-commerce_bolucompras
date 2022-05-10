/*HOOK*/
import React,{ useContext, useEffect, useState } from 'react';
import LoginContext from '../../context/LoginContext';
import CartContext from '../../context/CartContext'
import { Link } from 'react-router-dom';

/*Material UI*/
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { faCartShopping, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/*Firebase*/
import db from '../../utils/firebase';
import { collection, getDocs, doc, setDoc  } from 'firebase/firestore';

const CartWidget = () =>{

    /*User context*/
    const { userProvider } = useContext(LoginContext);

    /*Hook que revisa si el item fue removido del carrito*/
    const [ itemRemoved, setItemRemoved ] = useState( false );

    const [ itemAdded, setItemAdded ] = useState( false );


    /*Cart context*/
    const { cartWidgetItems, removeCartItem, cartItemCount, setCartWidgetItems } = useContext(CartContext);


    useEffect(()=>{
        /*Si se borra un producto del carrito 
        entonces lo borra de la base de datos*/
        itemRemoved && deleteItemFromDB();

    },[ itemRemoved ])

    /*Menu de CartWidget*/
    const [anchorCartWidget, setAnchorCartWidget] = React.useState(null);
    const openCartWidget = Boolean(anchorCartWidget);

    const handleOpenCartWidget = (event) => {
        setAnchorCartWidget(event.currentTarget);
        getWidget();
    };

    const handleCloseCartWidget = () => {
        setAnchorCartWidget(null);
    };


    const getWidget = async() => {

        /*Busco en la base de datos los carritos,
        si el mail coincide con el ID de la collecion, lo traigo.
        Por ultimo guardo lo que traje de la base de datos
        en el cart context*/

        const cartsCollection = collection(db, 'carritos');
        const cartsList = await getDocs(cartsCollection)
        
        cartsList.docs.map(( cart )=>{
            if( cart.id == userProvider.mail ){

                const cartProductsArray = Object.values( cart.data() );
        
                setCartWidgetItems( cartProductsArray )

                
            }
        })
    } 

    /*Borro el producto del cartContext y 
    le digo al hook que se borró un item*/
    const removeItemFromCart = async( itemID ) =>{

        removeCartItem(itemID)

        setItemRemoved( true );
    }

    /*Cuando se borra el item del Cart Context, 
    guardo los cambios en la base de datos*/

    const deleteItemFromDB = async() =>{
        /*
        const cartsCollection = collection(db, 'carritos');
        const cartsList = await getDocs(cartsCollection)
        */
       
        const itemCollection = collection(db,'carritos');
        const itemDoc = doc( db, 'carritos', userProvider.mail )

        /*Traigo el array de productos 
        y lo convierto en una coleccion de objetos*/
        const cartWidgetItemsToObject = Object.assign({},cartWidgetItems)

        const addItemToFirestore = await setDoc( itemDoc, cartWidgetItemsToObject )

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
                    right: 4,
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
                            <p className='no-products'>No hay productos en el carrito</p>

                        ) : (

                            <>
                            {
                            cartWidgetItems.map(( cartWidgetItem )=>{
                                return(
                                    <div key={cartWidgetItem.id} className='cartWidget-container__item'>

                                        <div className='cartWidget__item-left'>
                                            <img src={`${ cartWidgetItem.image }`} />
                                            <p className='cartWidget__item-title' >{cartWidgetItem.title}</p>
                                            <p className='cartWidget__item-stock' >{cartWidgetItem.stockCount} { cartWidgetItem.stockCount>1 ? 'unidades' : 'unidad' }</p>
                                        </div>

                                        <div className='cartWidget__item-right'> 
                                            <p className='cartWidget__item-price' >${cartWidgetItem.price}</p>
                                            <Button onClick={ () => {  removeItemFromCart( cartWidgetItem.id ) } }> 
                                                <FontAwesomeIcon icon={ faTrashCan }/>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })
                            } 

                            <div className='header-container__pay'>
                                <Button onClick={ handleCloseCartWidget }>
                                    {/*Pregunto si el usuario esta logueado,
                                    sino el link lo envia a la pagina para loguearse*/}
                                    { 
                                         userProvider.mail.length > 1 ?
                                         (
                                            <Link className='header-container__pay-link' to='/CartCheckout'>
                                                Ver carrito
                                            </Link>
                                         ) :(
                                            <Link className='header-container__pay-link' to='/LoginPage'>
                                                Ver carrito
                                            </Link>
                                         )
                                    } 
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