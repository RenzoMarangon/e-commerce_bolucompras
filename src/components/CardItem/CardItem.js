/*HOOKS*/
import React, {  useState } from 'react';
import { Link } from 'react-router-dom';

/*Material UI*/
import { Button } from '@mui/material';


const CardItem = ({ props }) => {

  /*Desestructuracion del producto*/
  const { id, title, description, price, stock, category, image, prevPrice} = props;

  let offerPercent = (prevPrice/price).toFixed(2)
  offerPercent = offerPercent.toString().slice(2,5)
  return (
    
    <Link to={`/${category}/${id}`} className='card-item'>
      <img src={ image } alt={ image }/>

      <div className='card-item__container'>
        <h3>{ title }</h3>

        {prevPrice ? (
          <div className='offer-container'>
            <p className='prevPrice'> ${ prevPrice }</p>
            <p className='offerPercent'>{ offerPercent }% off</p>
            <p className='offer'> Oferta </p>
          </div>
        ): (
          ''
        )}

        <p className='price'> ${ price }</p>

        <p className='cuotas'>6 cuotas sin interés de ${(price/6).toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default CardItem