import React, { useEffect, useState } from "react";
import mockItem from '../../utils/mockItem'
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from 'react-router-dom';
const ItemDetailContainer = () =>{


    const { id } = useParams();

    const [ products, setProducts ] = useState([]);

    const [ product, setProduct ] = useState({}) 

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

          filterByID(products,id)
          setLoading(true);
        })
    }


    const filterByID = (products, id ) =>{
      products.map(( product )=>{
        product.id == id && setProduct(product)
      })
    }

    return(
        <div className='itemDetailContainer'>
          
          {!loading ? <h1>carganding</h1> : <ItemDetail props={ product } />}
        </div>
    )
};

export default ItemDetailContainer;