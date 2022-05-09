/*HOOKS*/
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

/*Components*/
import ItemDetail from "../ItemDetail/ItemDetail";

/*Firebase*/
import db from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const ItemDetailContainer = () =>{

    const { id, category } = useParams();

    const [ products, setProducts ] = useState([]);

    const [ loading, setLoading ] = useState(false);

    useEffect( () => {
      /*Obtengo la lista de productos 
      y los filtro por categoria*/

      getProds().then((prods)=>{
        setProducts(prods)
        filterByID(prods,id,category)
        setLoading(true);
        console.log(products)
      })
    },[id])

  
    const getProds = async() => {
      const itemCollection = collection(db, 'productos');
      const productosSnap = await getDocs(itemCollection);
      
      return productosSnap.docs.map( (doc)=>{
        let product = doc.data();
        product.id = doc.id;
        return product;
      }) 

    }

    // const getProducts = () =>{
    //   fetch('https://fakestoreapi.com/products')
    //     .then( (response)=>{
    //       return response.json()
    //     })
    //     .then((products) =>{
    //       setProducts(products)
    //       filterByID(products,id,category)
    //       setLoading(true);
    //     })
    // }


    const filterByID = (products, id, category ) =>{

      /*Si el ID y la categoria coincide con el producto lo guardo*/
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