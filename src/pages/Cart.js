import React,{ useContext } from 'react'
import CartContext from '../context/CartContext'
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


const Cart = () => {
  /*Cart context*/
  const { cartWidgetItems, removeCartItem, totalAddCartItemCount } = useContext(CartContext);



  return (
    <div className='cart-container'>
      {
        cartWidgetItems.length<=0 ? 

        (

          <div className='cart-container__no-items'>
            <h2>
              No hay elementos en el carrito
            </h2>
          </div>
        ) : (

          <>
        
          {
            cartWidgetItems.map(( item )=>{
              return(
                <div key={item.id} className='cart-container__item'>
                  <p>{item.title}</p>
                  <p>{item.price}</p>
                  <p>{item.stockCount}</p>
                  
                  <Button onClick={ () => { removeCartItem( item.id ) } }> 
                    <FontAwesomeIcon icon={ faTrashCan }/>
                  </Button>
                </div>
              )
            })    
          }

          <div className='cart-container__total'>
            <p>
              Precio total :{totalAddCartItemCount()}
            </p>
          </div>
          </>
        )
      }

    </div>
  )
}

export default Cart