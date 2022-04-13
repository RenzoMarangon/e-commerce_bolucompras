import React,{ useContext } from 'react'
import CartContext from '../context/CartContext'

const Cart = () => {
  /*Cart context*/
  const { cartWidgetItems } = useContext(CartContext);

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

          cartWidgetItems.map(( item )=>{
            return(
              <div key={item.id} className='cart-container__item'>
                <p>{item.title}</p>
                <p>{item.price}</p>
                <p>{item.stockCount}</p>
              </div>
            )
          })
        )
      }
      
    </div>
  )
}

export default Cart