import React from 'react'
import ItemCount from '../ItemCount/ItemCount'
import { Button } from '@mui/material';
import  imagen  from '../../img/dropdead_remera.png'
import logo from '../../img/logo.png'

const ItemDetail = ({ props }) => {

    const { title, description, image, stock, price } = props;

  return (
    <div className='itemDetail'>
        <div className='itemDetail__images'>
            <img src={ imagen } />
        </div>

        <div className='itemDetail__text'>
            <div className='itemDetail__info'>
                <h2>{ title }</h2>
                <p> { description } </p>
                <p> ${ price } </p>
                <p>12 cuotas sin interes de ${ (price/12).toFixed(2) }</p>
                { stock>3 ? <p className='stock'>stock disponible</p> : <p className='stockOut'>Sin stock</p> }
                <ItemCount stock={ stock} />
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