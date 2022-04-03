import React, { useState } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';


const CardItem = ({ props }) => {

  /*Desestructuracion de props*/
  const { id, title, description, price, rating, category, image} = props;

  const { count } = rating;

  /*Alerta del boton 'agregar al carrito'*/

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
    const [open, setOpen] = useState(false);
  
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


  return (
    
    <div className='card-item'>
      <img src={ image } alt={ image }/>

      <div className='card-item__container'>
        <h3>{ title }</h3>
        <p> ARG$ { price*100 }</p>
        <ItemCount stock = { count } />
        <Link to={`/${category}/${id}`}>
          <button onClick={handleClick} className='card-item__container-button'>Agregar al carrito</button>
        </Link>

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            El producto se agregó correctamente al carrito
          </Alert>
        </Snackbar>
        
      </div>
        
    </div>
  )
}

export default CardItem