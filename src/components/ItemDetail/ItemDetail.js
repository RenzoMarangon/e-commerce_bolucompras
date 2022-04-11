import React, { useState, useContext } from 'react'
import ItemCount from '../ItemCount/ItemCount'
import { Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Link } from 'react-router-dom';
import CartContext from '../../context/CartContext';

const ItemDetail = ({ props }) => {

    
    /*Cart Context*/
    const { addItemToCart } = useContext(CartContext);

    /*Desestructuracion*/

    const { title, description, price, rating, image } = props;
    const { count } = rating;

    /*Agregar/quitar stock en ItemCount*/
    const [ stockCount, setStockCount ] = useState(1);

    const addCount = ( ) => {
        count>stockCount && setStockCount(stockCount+1);
    }

    const removeCount = () => {
        1<stockCount && setStockCount(stockCount-1);
    }


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

            <ItemCount stock = { stockCount } addCount={ addCount } removeCount={ removeCount } />
            </div>

            <div className='itemDetail__buttons'>
            <Button className='itemDetail__buttons-btn' onClick={()=>{addItemToCart(props)}}> Agregar al carrito </Button>
            <Button className='itemDetail__buttons-btn' > <Link to={'/Cart'}>Terminar compra </Link> </Button> 
            </div>
        </div>

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              El producto se agregó correctamente al carrito
            </Alert>
        </Snackbar>
    </div>
  )
}

export default ItemDetail