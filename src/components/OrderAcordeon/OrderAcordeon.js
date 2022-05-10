/*HOOKS*/
import React from 'react'

/*Material UI*/
import { Accordion } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const OrderAcordeon = ( { props } ) => {

    const { products, id, total } = props;

  return (
    <Accordion>
    <AccordionSummary
    expandIcon={<ExpandMoreIcon />}
    aria-controls="panel1a-content"
    id="panel1a-header"
    >
      { id }
    
    </AccordionSummary>
    <AccordionDetails>
      {
         products.map(( product )=>{
            return(
                <>
                <p> { product.title } </p>
                <p> { product.price } </p>
                <p> { product.count } </p>
                </>
            )
        })
      }
      <p>{ total }</p>
    </AccordionDetails>
  </Accordion>
  )
}

export default OrderAcordeon