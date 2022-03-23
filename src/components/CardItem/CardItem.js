import React from 'react'

const CardItem = (props) => {

    const {title, srcImage, altImage, description} = props.props;
  
  return (
    
    <div>
        <h3>{ title }</h3>
        <img src={ srcImage } alt={ altImage }/>
        <p>{ description }</p>
        <button>Agregar al carrito</button>
    </div>
  )
}

export default CardItem