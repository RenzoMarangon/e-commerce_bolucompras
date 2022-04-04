import { Skeleton } from '@mui/material';
import React,{ useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import ItemListContainer from '../components/ItemListContainer/ItemListContainer'

const Categorys = () => {



    const [ products, setProducts ] = useState([]);
    const [ categorys, setCategorys ] = useState([])
    const [ loader, setLoader ] = useState(false);
    const categorysSaved = [];

    useEffect(()=>{
        getItems();
    },[]);


    const getItems =()=>{
        fetch('https://fakestoreapi.com/products')
        .then(( response )=>{
          return response.json();
        })
        .then(( products )=>{
            setProducts(products);
            filterByCategorys(products)
            setCategorys(categorysSaved)
            setLoader(true);
        })
    }

    const filterByCategorys=( array )=>{
        return array.map(( product )=>{
            !categorysSaved.includes(product.category) && categorysSaved.push(product.category) 
        })      
    }

    const skeleton = 
        <div className='categorys-container__skeleton'>
            <Skeleton className='skeleton-icon' />
            <Skeleton className='skeleton-text'  />
        </div>;

  return (
   
    <div className='categorys-container'>
        {!loader ?  [skeleton, skeleton, skeleton]

        : 

        categorys.map((category)=>{
            return(
                <div className='categorys-container__link'>
                     <Link to={`/${category}`} > {category}  </Link>
                </div>
            )
        })}

        
    </div>
  )
}

export default Categorys