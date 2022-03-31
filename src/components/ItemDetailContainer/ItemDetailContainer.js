import React, { useEffect, useState } from "react";
import mockItem from '../../utils/mockItem'
import ItemDetail from "../ItemDetail/ItemDetail";

const ItemDetailContainer = () =>{

    const [ props, setProps ] = useState({});

    const getProducts = () =>{
      return new Promise ( (resolve,reject) =>{
        return resolve(mockItem);
      })
    }

    useEffect( ()=>{
      getProducts().then( (product) =>{
        setProps(product)
      })
    },[])
    
    console.log(props)

    return(
        <div className='itemDetailContainer'>
          <ItemDetail props={ props } />
        </div>
    )
};

export default ItemDetailContainer;