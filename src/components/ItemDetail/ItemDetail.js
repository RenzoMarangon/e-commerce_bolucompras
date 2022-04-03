import React, { useEffect } from 'react'
import ItemCount from '../ItemCount/ItemCount'
import { Button } from '@mui/material';


const ItemDetail = ({ props }) => {

    const { title, description, price, rating, image } = props;
    const { count } = rating;

    useEffect(()=>{
      
    },[])
  return (
    <div className='itemDetail'>
        <div className='itemDetail__images'>
            <img src={ image } />
        </div>

        <div className='itemDetail__text'>
            <div className='itemDetail__info'>
                <h2>{ title }</h2>
                <p> { description } </p>
                <p> ${ price*100 } </p>
                <p>12 cuotas sin interes de ${ (price*100/12).toFixed(2) }</p>
                { count>3 ? <p className='stock'>stock disponible</p> : <p className='stockOut'>Sin stock</p> }
                <ItemCount stock={ count } />
            </div>

            <div className='itemDetail__buttons'>
            <Button className='itemDetail__buttons-btn'> Comprar </Button> 
            <Button className='itemDetail__buttons-btn'> Agregar al carrito </Button>
            </div>
        </div>
    </div>
  )
}

export default ItemDetail