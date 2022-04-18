import React, { useState, useEffect } from 'react'
import ItemListContainer from '../components/ItemListContainer/ItemListContainer'
import db, { storage } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

const Home = () => {


    const [ products, setProducts ] = useState([])
    const [ loading, setLoading ] = useState(false);

    useEffect( () => {

        getProducts().then((prods)=>{
          setProducts(prods)
          setLoading(true);

        })
    },[])

    const getProducts = async() => {
      const itemCollection = collection( db, 'productos' );
      const productsDB = await getDocs(itemCollection);
      return productsDB.docs.map( (product) =>{
        let prod = product.data();
        prod.id= product.id;
        return prod;
      })
    }

    const addToStorage = async(e) =>{

      const archivo =  e.target.files[0]
      const storageRef = storage.storage().ref();
      const pathStorage = storageRef.child(archivo.name)
      await pathStorage.put(archivo)
      console.log(archivo.name)
      console.log('asd')
    }



  return (
    <ItemListContainer listProducts={products} loading={loading} />
    // <>
    //   <form>
    //     <input type='file' onClick={addToStorage} placeholder='Archivos' />
    //     <button type='submit' > Enviar </button>
    //   </form>
    // </>
  )
}

export default Home;