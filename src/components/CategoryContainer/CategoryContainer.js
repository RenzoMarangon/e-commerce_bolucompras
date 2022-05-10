/*HOOKS*/
import React,{ useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

/*Components*/
import ItemListContainer from '../ItemListContainer/ItemListContainer';

/*Firebase*/
import db from '../../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';



const CategoryContainer = () => {

    const { category } = useParams();

    const [ products, setProducts ] = useState([])

    /*Revisa si se la página se está cargando*/
    const [ loader, setLoader ] = useState(false)

    useEffect(()=>{
        /*Obtiene los productos y los filtra por categoría*/
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

    
  return (
    <ItemListContainer listProducts={products} loading={loader}/>
  )
}

export default CategoryContainer