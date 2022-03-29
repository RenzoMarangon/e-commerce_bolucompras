import CardItem from '../CardItem/CardItem'
import React, {useEffect, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';


const ItemListContainer = ({ listProducts }) => {



    const [ products, setProducts ] = useState([])
    const [ loading, setLoading ] = useState(false);

    // const getProducts = () =>{
    //   return new Promise(( resolve, reject ) => {
    //     setTimeout(()=>{
    //       return resolve( listProducts );
    //     },2000);
    //   })
    // } 

    useEffect( () => {
      // getProducts()
      // .then(( products )=>{
      //   setProducts( products )
      // });
      
      fetch('https://fakestoreapi.com/products?limit=10')
      .then(( response )=>{
        return response.json();
      })
      .then(( products )=>{
        setProducts(products);
        setLoading(true);
      })
    },[])


  return (
    <main>
      
        <div className='main-container'>
          <div className='main-container__item-list-container'>

            {!loading ? <CircularProgress className='main-container__item-list-container__spinner' /> :
            products.map(( product ) =>{
              return(
                <CardItem key={ product.id } props={ product } />
              )
            })
            }

          </div>
        </div>
    </main>
  )
}

export default ItemListContainer