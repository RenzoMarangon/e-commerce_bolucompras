import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../context/CartContext'
import LoginContext from '.././context/LoginContext'
import db from '../utils/firebase';
import {  collection, doc, addDoc, setDoc, getDocs } from 'firebase/firestore';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const CartCheckout = () => {

  const { cartWidgetItems, totalAddCartItemCount, removeCartItem } = useContext(CartContext);

  const { userProvider } = useContext(LoginContext);

  const [ orderID, setOrderID ] = useState('');



  const [ newOrder, setNewOrder ] = useState({
    buyer: userProvider,
    products: cartWidgetItems.map(( item ) => {
      return {
        id: item.id,
        title: item.title,
        price: item.price,
        count: item.stockCount,
      }
    }),
    total : totalAddCartItemCount(),
  })

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  /*Hook que revisa si el item fue removido del carrito*/
  const [ itemRemoved, setItemRemoved ] = useState( false );

  useEffect(()=>{
    if( orderID.length>1 ){
      getUserOrders( userProvider.mail )
      handleOpen();

    }

    /*Si se borra un producto del carrito 
    entonces lo borra de la base de datos*/
    itemRemoved && deleteItemFromDB();

  },[ orderID, itemRemoved ])


  

  const setOrders = async() =>{

    const ordersCollection = collection( db, 'orders' );
    const addOrderToFirestore = await addDoc( ordersCollection, newOrder )
    setOrderID( addOrderToFirestore.id );

  }

  const getUserOrders = async( userID ) => {
    const ordersCollection = collection( db, 'userOrders' );
    const ordersList = await getDocs( ordersCollection );

    let savedOrders = {}

    ordersList.docs.map(( order ) => {
      
      if( userID == order.id ){
        savedOrders = order.data()
      }
    })

    if( savedOrders ) {
      setUserOrder( orderID, savedOrders )
    }


  }

  const setUserOrder = async( userOrderID, savedOrders) => {
    

      const userOrderObject = { ...savedOrders };
      userOrderObject[`${userOrderID}`] = {
        products: cartWidgetItems.map(( item )=>{
          return{
            title: item.title,
            price: item.price,
            count: item.stockCount,
            image: item.image,
          }
        }),
        total: totalAddCartItemCount(),
        id:userOrderID,
      };

      const ordersCollection = collection( db, 'userOrders' );
      const userOrderDoc = doc( db, 'userOrders', userProvider.mail );
      const addOrderToFirestore = await setDoc( userOrderDoc, userOrderObject )
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


  return (
    <div className='cartCheckout-container'>

    {
      cartWidgetItems.length > 0 ? (
      <>
      <div className='cartCheckout-container__description'>
        <p className='description-product'> Producto </p>
        <p className='description-price'> Precio y cantidad</p>
        <p className='description-subtotal'> Subtotal </p>
      </div>

      <div className='cartCheckout-container__items'>
          {
              cartWidgetItems.map(( item )=>{
                  const {id, image, price, stockCount, title } = item;
                  return(
                                         
                    <div key={ id } className='cartCheckout-container__items__item'>
                      <img src={`${ image }`} />
                      <p className='item-title' > { title } </p>
                      <p className='item-stockCount' > { stockCount } x $ { price } </p>
                      <p className='item-total' > $ { stockCount*price } </p>
                      <Button onClick={()=> { removeItemFromCart( id ) }} className='item-delete'> 
                          <FontAwesomeIcon icon={ faTrashCan }/>
                      </Button>
                    </div>
                  )
              })
          }

          <p className='cartCheckout-container__total'>Total: { totalAddCartItemCount().toFixed(2) } </p>
          <div className='finish'>
            <Button onClick={ setOrders }> Finalizar compra </Button>
          </div>
          

          <Modal 
            disableEnforceFocus
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className='modal-container'>
              {`id: ${ orderID }`}
              <Button  onClick={handleClose}> Finalizar compra </Button>
            </div>

          </Modal>
      </div>
      </>
      ) : (
        <div className='no-products'>
          <p>No hay productos en el carrito</p>
        </div>
      )
    }
        
    </div>
  )
}

export default CartCheckout