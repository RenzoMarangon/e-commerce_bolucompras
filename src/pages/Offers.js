/*HOOKS*/
import React,{ useEffect, useState } from 'react'

/*Components*/
import ItemListContainer from '../components/ItemListContainer/ItemListContainer';

/*Firebase*/
import db from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';


const Offers = () => {

  const [ loading, setLoading ] = useState( false );

  const [ offersList, setOffersList ] = useState([]);

  useEffect(()=>{
    getOffers().then(( offers )=>{
      setOffersList( offers );
      setLoading( true )
    })
  },[])

  const getOffers = async() => {

    const offersCollection = collection( db, 'productos' );
    const offersDocs = await getDocs( offersCollection );

    /*Convierto lo que extraje de firebase a objetos*/
    let offers = offersDocs.docs.map(( offerDoc )=>{
      let offer = offerDoc.data();
      offer.id = offerDoc.id;
      return offer;
    })

    /*Filtro las ofertas*/
    return offers = offers.filter( offer => offer.offer === true );
  }

  return (

      <ItemListContainer listProducts={ offersList } loading={ loading } />
    
  )
}

export default Offers