import React, { useState, useEffect } from 'react'
import ItemListContainer from '../components/ItemListContainer/ItemListContainer'

const Home = () => {


    const [ products, setProducts ] = useState([])
    const [ loading, setLoading ] = useState(false);

    useEffect( () => {

        fetch('https://fakestoreapi.com/products')
        .then(( response )=>{
          return response.json();
        })
        .then(( products )=>{
          setProducts(products);
          setLoading(true);
        })
        
      },[])

  return (
    <ItemListContainer listProducts={products} loading={loading} />
  )
}

export default Home