/*HOOKS*/
import React, { useState, useContext, useEffect } from 'react'
import CartContext from '../../context/CartContext';

/*Material UI*/
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Button } from '@mui/material';

/*Componentes*/
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount'





const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ItemDetail = ({ props }) => {

    const {id, title, description, price, stock, image } = props;
    const { cartWidgetItems, addItemToCart } = useContext(CartContext);

    
    /*Hook que revisa si el producto se agregó un item al carrito*/
    const [ productAdded, setProductAdded ] = useState(false);


    /*Añadir un producto al array*/
    const addProductToCart = (props) => {
        setOpen(true); /*Muestra la alerta*/
        addItemToCart({...props , stockCount: stockToAdd });     
        setProductAdded(true);

    }

    /*Guardar cantidad de productos a comprar*/
    const [ stockToAdd, setStockCount ] = useState(1);

    /*Alerta del boton 'agregar al carrito'*/
    const [open, setOpen] = React.useState(false);
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
                <p> ${ price } </p>
                <p>12 cuotas sin interes de ${ (price/12).toFixed(2) }</p>
                
                { stock>3 ? <p className='stock'>stock disponible</p> : <p className='stockOut'>Sin stock</p> }

                {  !productAdded && 
                
                    <ItemCount stock = { stock } addStock = { setStockCount } count = { stockToAdd }  />
                }
       

            </div>

            <div className='itemDetail__buttons'>
               {
                   !productAdded ? (

                    <Button className='itemDetail__buttons-btn' onClick={()=>{ addProductToCart(props); }} > 
                        Agregar al carrito 
                    </Button>

                   ) : (

                    <>
                    <Button className='itemDetail__buttons-btn' > 
                        <Link to={'/'}> 
                            Seguir comprando
                        </Link> 
                    </Button> 

                    <Button className='itemDetail__buttons-btn' > 
                        <Link to={'/Cart'}> 
                            Terminar compra 
                        </Link> 
                    </Button> 
                    </>
                   )
               }
            </div>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={'success'} sx={{ width: '100%' }}>
                    ¡El producto se agregó correctamente al carrito!
                </Alert>
            </Snackbar>
        </div>

        
    </div>
  )
}

export default ItemDetail