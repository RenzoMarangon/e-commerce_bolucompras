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
        console.log(categorys)
    },[]);


    const getItems =()=>{
        fetch('https://fakestoreapi.com/products')
        .then(( response )=>{
          return response.json();
        })
        .then(( products )=>{
            setProducts(products);
            filterByCategorys(products)
            setLoader(true);
            setCategorys(categorysSaved)
            
        })
    }

    const filterByCategorys=( array)=>{
        return array.map(( product )=>{
            !categorysSaved.includes(product.category) && categorysSaved.push(product.category) 

        })      
    }

  return (
   
    <div className='categorys-container'>
        {categorys.map((category)=>{
            return(
                <Link to={`/${category}`}> {category} </Link>
            )
        })}

        
    </div>
  )
}

export default Categorys