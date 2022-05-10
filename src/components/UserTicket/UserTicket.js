/*HOOKS*/
import React,{ useEffect, useState, useContext } from 'react'
import LoginContext from '../../context/LoginContext';

/*Firebase*/
import db from '../../utils/firebase';
import { getDocs, collection } from 'firebase/firestore';

/*Material UI*/
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


const UserTicket = () => {
    
    const { userProvider } = useContext(LoginContext);

    const [ userTickts, setUserTickts] = useState([])

    useEffect(()=>{
        getOrders();

    },[ ])


    const getOrders = async() => {
        const ordersCollection = collection(db, 'userOrders');
        const ordersList = await getDocs( ordersCollection );

        return ordersList.docs.map(( orders )=>{
            if( orders.id == userProvider.mail ){
                const ord = orders.data();
                const arrayTickets = Object.values( ord )
                setUserTickts( arrayTickets )
            }
        })
      }

  return (
    <div className='userTickets-container'>

        {
            userTickts.map(( ticket )=>{
                const { products, id, total } = ticket;

                return(
                <div className='ticket' key={ id }>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                    >
                        <h2>Ticket ID: <span> { id }</span> </h2>

                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='products'>
                                {
                                    products.map(( product )=>{
                                        return(
                                        <div className='product'>
                                            <img src={`${product.image}`} />
                                            <p className='product-title'>{ product.title }</p>
                                            <p className='product-price'>{ product.count } x ${ product.price }</p>
                                            <p className='product-count'></p>
                                        </div>
                                        )
                                    })
                                }
                            </div>
                            <p className='total'>Total: <span>{ total }</span></p>
                        </AccordionDetails>
                    </Accordion>
                </div>
                )
            })
        }
    </div>
  )
}

export default UserTicket


