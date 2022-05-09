/*HOOKS*/
import React,{ useContext, useEffect, useState } from 'react'
import LoginContext from '../../context/LoginContext';

/*Firebase*/
import { getDocs, collection,  } from "firebase/firestore"
import db from '../../utils/firebase';

/*Components*/
import OrderAcordeon from '../OrderAcordeon/OrderAcordeon';



const UserOrders = () => {

    const { userProvider } = useContext( LoginContext );
    const [ orders, setOrders ] = useState([])
    const [ loading, setLoading ] = useState( false );

    useEffect(()=>{
      getOrders();
    },[])

    const getOrders = async() => {
        const ordersCollection = collection( db, 'userOrders' );
        const orderList = await getDocs( ordersCollection );
        orderList.docs.map(( order ) =>{

          if( order.id === userProvider.mail ){
            setOrders( order.data() )
          }
        })

        setLoading( true )
 
    }

  return (
    <div className='userOrders-container'>
      { 
      Object.values(orders).map(( order )=>{
        return(
          <>
          { 
            !loading ? (
              <h1> Carganding </h1>
            ) : (
              <>

              <OrderAcordeon  props={ order } loading={ loading } />
              </>
            )

          }
          </>
        )

      }) 
      }
    </div>
  )
}

export default UserOrders