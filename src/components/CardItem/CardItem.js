import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


const CardItem = ({ props }) => {


  /*Desestructuracion de props*/
  const { id, title, description, price, stock, category, image} = props;

  return (
    
    <div className='card-item'>
      <img src={ image } alt={ image }/>

      <div className='card-item__container'>
        <h3>{ title }</h3>
        <p> ARG$ { price }</p>
        <Link to={`/${category}/${id}`}>
          <Button  className='card-item__container-button' >Agregar al carrito</Button>
        </Link>

        
      </div>
        
    </div>
  )
}

export default CardItem