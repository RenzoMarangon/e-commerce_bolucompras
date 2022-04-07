import React, { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () =>{


    const { id, category } = useParams();

    const [ products, setProducts ] = useState([]);

    const [ loading, setLoading ] = useState(false);

    useEffect( ()=>{
      getProducts()
    },[id])
    
    
    const getProducts = () =>{
      fetch('https://fakestoreapi.com/products')
        .then( (response)=>{
          return response.json()
        })
        .then((products) =>{
          setProducts(products)
          filterByID(products,id,category)
          setLoading(true);
        })
    }


    const filterByID = (products, id, category ) =>{

      products.filter(( product )=>{
        product.id == id & product.category == category && setProducts(product)
      })

    }



    return(
        <div className='itemDetailContainer'>
          {!loading ? <h1>carganding</h1> : <ItemDetail props={ products } />}
        </div>
    )
};

export default ItemDetailContainer;