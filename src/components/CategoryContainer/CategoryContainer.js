import React,{ useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ItemListContainer from '../ItemListContainer/ItemListContainer';
import db from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';



const CategoryContainer = () => {

    const { category } = useParams();
    const [ products, setProducts ] = useState([])
    const [ loader, setLoader ] = useState(false)

        useEffect(()=>{
            getElements().then(( listProducts )=>{
                setProducts(listProducts);
                setLoader( true );
                setProducts( filterByCategory(listProducts,category) ) ;
            })
        },[])

    const getElements = async() =>{
        const itemCollection = collection(db, 'productos');
        const itemSnap = await getDocs(itemCollection); 

        return itemSnap.docs.map( (doc) =>{
            let product = doc.data();
            product.id = doc.id;
            return product;
        })

    }

    const filterByCategory = (listProducts, category) =>{
        return listProducts.filter(( product ) => {
           return product.category === category;
        })

        
    }

  

        // fetch(`https://fakestoreapi.com/products/category/${category}`)
        // .then((response)=>{
        //     return response.json();
        // }).then((products)=>{
        //     setProducts(products);
        //     setLoader(true);
        // })
    
  return (
    
    <ItemListContainer listProducts={products} loading={loader}/>

    
  )
}

export default CategoryContainer