import React, {  useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';


const CardItem = ({ props }) => {


  /*Desestructuracion de props*/
  const { id, title, description, price, rating, category, image} = props;
  const { count } = rating;



  /*Agregar/quitar stock en ItemCount*/

  const [ stockCount, setStockCount ] = useState(1);

  const addCount = ( ) => {
    count>stockCount && setStockCount(stockCount+1);
  }

  const removeCount = () => {
      1<stockCount && setStockCount(stockCount-1);
  }


  return (
    
    <div className='card-item'>
      <img src={ image } alt={ image }/>

      <div className='card-item__container'>
        <h3>{ title }</h3>
        <p> ARG$ { price*100 }</p>
        <ItemCount stock = { stockCount } addCount={ addCount } removeCount={ removeCount } />
        <Link to={`/${category}/${id}`}>
          <button  className='card-item__container-button' >Agregar al carrito</button>
        </Link>

        
      </div>
        
    </div>
  )
}

export default CardItem