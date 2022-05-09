/*HOOKS*/
import React, { useState, useContext, useEffect } from 'react'
import CartContext from '../../context/CartContext';
import LoginContext from '../../context/LoginContext';
import { Link, useParams } from 'react-router-dom';

/*Material UI*/
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Button } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';

/*Componentes*/
import ItemCount from '../ItemCount/ItemCount'

/*Firebase*/
import db from '../../utils/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ItemDetail = ({ props }) => {

    /*Desestructuracion del producto*/
    const {id, title, description, price, stock, image, prevPrice } = props;

    /*Cart context*/
    const { cartWidgetItems, addItemToCart } = useContext(CartContext);

    /*User context*/
    const { userProvider } = useContext(LoginContext);

    const { category } = useParams();

    /*Hook que revisa si el producto se agregó un item al carrito*/
    const [ productAdded, setProductAdded ] = useState(false);

    let offerPercent = (prevPrice/price).toFixed(2)
    offerPercent = offerPercent.toString().slice(2,5)

    useEffect(()=>{

        /*Pregunto si hay items en el carrito y si el usuario esta logueado
        Si es así, agrego el item a la base de datos*/

        if(cartWidgetItems.length>0 && userProvider.mail.length>1){
            itemRegister( userProvider.mail, cartWidgetItems )
            console.log(cartWidgetItems)
        }

    },[cartWidgetItems])



    const addProductToCart = (props) =>{

        addItemToCart({...props , stockCount: stockToAdd })

        setProductAdded(true)

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

        /*Como Firebase no me dejaba agregar un array, tuve que
        convertir el contenido del carrito en una collecion de objetos*/
        const arrayToObject = Object.assign({}, cartWidgetItems);

        const itemCollection = collection(db,'carritos');
        const itemDoc = doc( db, 'carritos', userID )
        const addItemToFirestore = await setDoc( itemDoc, arrayToObject )
    }


    /*BreadCrumb*/
    function handleClickBreadcrumb(event) {
        event.preventDefault();
      }

  return (
    <div className='itemDetail'>
        
        <img className='itemDetail__images' src={ image } />

        <div className='itemDetail__text'>
            {/*BreadCrumbs*/}
            <div role="presentation" onClick={handleClickBreadcrumb}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to="/">
                    Inicio
                </Link>

                <Link underline="hover" color="inherit" to={`/Categorys/${category}`} >
                    { category }
                </Link>

                <Link underline="hover" color="text.primary" to={`/${category}/${id}`} aria-current="page">
                    { title }
                </Link>
            </Breadcrumbs>
        </div>
                
            <div className='itemDetail__info'>
                
                <h2>{ title }</h2>
                <p> { description } </p>
                {
                prevPrice ? ( 
                <>
                    <p>${ prevPrice }</p>
                    <p>{ offerPercent }%</p>
                </>
                ) : (
                    ''
                )
                }
                <p> ${ price } </p>
                <p>12 cuotas sin interes de ${ (price/12).toFixed(2) }</p>


            </div>
            
            { /*Si el producto no está añadido muestro itemCount + boton comprar*/
            
            productAdded==false ? (

            <div className='itemDetail__info'>
                { stock > 3 ? (
                
                    <>
                    <p className='stock'>stock disponible</p> 

                    { !productAdded && <ItemCount stock = { stock } addStock = { setStockCount } count = { stockToAdd } /> }

                    <Button className='itemDetail__buttons-btn' onClick={()=>{ addProductToCart(props); }} > 
                         Agregar al carrito 
                    </Button>
                    </>

                ) : (

                    <Alert variant="filled" severity="error">
                        Por el momento no tenemos stock.
                    </Alert>
                )}

            
            </div>
            ) : (
            <>
            {/*Botones*/}
            <div className='itemDetail__buttons'>

                <Button className='itemDetail__buttons-btn' > 
                    <Link to={'/'}> 
                        Seguir comprando
                    </Link> 
                </Button> 

                <Button className='itemDetail__buttons-btn' > 
                {/*Pregunto si el usuario esta logueado, 
                    sino, el link lo manda a la página de logueo*/}
                { 
                    userProvider.mail.length > 1 ?
                    (
                    <Link to='/CartCheckout'>
                        Terminar compra
                    </Link>

                    ) :(
                    <Link to='/LoginPage'>
                        Terminar compra
                    </Link>
                )}
                </Button> 
            </div>
            </>
            )}
            
            




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