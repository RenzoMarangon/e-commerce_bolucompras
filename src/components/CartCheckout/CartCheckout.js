/*HOOKS*/
import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../context/CartContext';
import LoginContext from '../../context/LoginContext';

/*Firebase*/
import db from '../utils/firebase';
import {  collection, doc, addDoc, setDoc, getDocs } from 'firebase/firestore';

/*Material UI*/
import { Button } from '@mui/material';


const CartCheckout = () => {

  const { cartWidgetItems, totalAddCartItemCount } = useContext( CartContext );
  const { userProvider } = useContext( LoginContext );

  const [ orderID, setOrderID ] = useState('');


  const [ newOrder, setNewOrder ] = useState({
    buyer: userProvider,
    products: cartWidgetItems.map(( item ) => {
      return {
        id:    item.id,
        title: item.title,
        price: item.price,
        count: item.stockCount,
      }
    }),
    total : totalAddCartItemCount(),
  })

  useEffect(()=>{
    if( orderID.length>1 ){
      getUserOrders( userProvider.mail )
    }


  },[ orderID ])


  

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
      };

      const ordersCollection = collection( db, 'userOrders' );
      const userOrderDoc = doc( db, 'userOrders', userProvider.mail );
      const addOrderToFirestore = await setDoc( userOrderDoc, userOrderObject )
    }
  

  return (
    <div className='cartCheckout-container'>
        <div className='cartCheckout-container__items'>
            
            {
                cartWidgetItems.map(( item )=>{
                    const {id, category, description, image, price, stockCount, title } = item;
                    return(
                                           
                      <div key={ id } className='cartCheckout-container__items__item'>
                        <p className='item-title' > { title } </p>
                        <p className='item-description' > { description } </p>
                        <p className='item-stockCount' > { stockCount } x { price } </p>
                        <p className='item-total' > { stockCount*price } </p>
                      </div>
                    )
                })
            }

            <p>Total: { totalAddCartItemCount() } </p>

            <Button onClick={ setOrders }> Enviar </Button>
        </div>
        
    </div>
  )
}

export default CartCheckout