import React,{ useContext, useState } from 'react'
import CartContext from '../context/CartContext'
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import db from '../firebase';
import  { addDoc, collection, getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';


const Cart = () => {
  /*Cart context*/
  const { cartWidgetItems, removeCartItem, totalAddCartItemCount, clearCartWidget } = useContext(CartContext);

  const [ successOrderID, setSuccessOrderID ] = useState('')

  const [ formData, setFormData ] = useState({
    name:'',
    phone:'',
    mail:'',
  })

  const [ newOrder, setNewOrder ] = useState({
    buyer: formData,
    products: cartWidgetItems.map(( item ) => {
      return {
        id: item.id,
        title: item.title,
        price: item.price,
      }
    }),
    total : totalAddCartItemCount(),
  })

  const handleInputChange = (e) => {
    const { name , value } = e.target;
    setFormData({
      ...formData,
      [ name ] : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewOrder({ ...newOrder, buyer : formData});
    pushNewOrder( {...newOrder, buyer: formData} );
    clearCartWidget();
  }

  const pushNewOrder = async(orderPushed) => {
    const orderFirebase = collection( db, 'orders' );
    const addOrderDoc =  await addDoc( orderFirebase, orderPushed )
    setSuccessOrderID( addOrderDoc.id );
  }


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

            { successOrderID ? ( 
              <>
                <p> id de compra: { successOrderID }</p>
              </>
            ) : ( 
            
            <form onSubmit={ handleSubmit }>
              <input type="text" onChange={ handleInputChange } 
                name='name'
                value={ formData.name } 
                placeholder='Nombre' required 
              />

              <input 
                type="number"
                name='phone' 
                onChange={ handleInputChange } 
                value={ formData.phone } 
                placeholder='Teléfono'  
              />
                
              <input 
                type="email"
                onChange={ handleInputChange } 
                name='mail' 
                value={ formData.mail } 
                placeholder='Mail' required 
              />
                
              <Button type='submit'> terminar compra </Button>
            </form>
            )}

    </div>
  )
}

export default Cart