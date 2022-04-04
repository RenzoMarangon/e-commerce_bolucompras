import React,{ useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemListContainer from '../ItemListContainer/ItemListContainer';
const CategoryContainer = () => {

    const { category } = useParams();
    const [ products, setProducts ] = useState([])
    const [ loader, setLoader ] = useState(false)

    useEffect(()=>{
        getElements();
    },[])

    const getElements = () =>{
        fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then((response)=>{
            return response.json();
        }).then((products)=>{
            setProducts(products);
            setLoader(true);
        })
    }
  return (
    <ItemListContainer listProducts={products} loading={loader}/>
  )
}

export default CategoryContainer