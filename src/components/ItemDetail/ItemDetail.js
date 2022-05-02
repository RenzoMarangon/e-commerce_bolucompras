/*HOOKS*/
import React, { useState, useContext, useEffect } from 'react'
import CartContext from '../../context/CartContext';
import LoginContext from '../../context/LoginContext';
import { useNavigate } from 'react-router-dom';


/*Material UI*/
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Button } from '@mui/material';

/*Componentes*/
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount'

/*Firebase*/
import db,{ app } from '../../utils/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';





const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ItemDetail = ({ props }) => {

    const {id, title, description, price, stock, image } = props;
    const { cartWidgetItems, addItemToCart } = useContext(CartContext);

    const { userProvider } = useContext(LoginContext);


    const [ spinner, setSpinner ] = useState(false);



    /*Hook que revisa si el producto se agregó un item al carrito*/
    const [ productAdded, setProductAdded ] = useState(false);


    useEffect(()=>{
        if(cartWidgetItems.length>0 && userProvider.mail.length>1){
            itemRegister( userProvider.mail, cartWidgetItems )
        }

    },[cartWidgetItems])

    const addProductToCart = (props) =>{
        const userProviderToString = `${userProvider.name}`;
        setSpinner(true);
        addItemToCart({...props , stockCount: stockToAdd })

        setProductAdded(true)
        setSpinner(false);
        /*Muestra la alerta*/
        setOpen(true)
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




    /*Guardo los datos de la consola en fireStore*/
    const itemRegister = async( userID, cartWidgetItems ) => {
 
        const arrayToObject = Object.assign({}, cartWidgetItems);
        const itemCollection = collection(db,'carritos');
        const itemDoc = doc( db, 'carritos', userID )
        const addItemToFirestore = await setDoc( itemDoc, arrayToObject )
        console.log('registro etsitoso')

    }







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

                {  

                    !productAdded && !spinner && <ItemCount stock = { stock } addStock = { setStockCount } count = { stockToAdd } />  
                    

                }
       

            </div>

            <div className='itemDetail__buttons'>
               {
                   !productAdded ? (

                    spinner ? (
                        <>
                            <p>Expiner</p>
                        </>
                    ):(
                        <>
                        <Button className='itemDetail__buttons-btn' onClick={()=>{ addProductToCart(props); }} > 
                            Agregar al carrito 
                        </Button>

                        </>
                    )

                    
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