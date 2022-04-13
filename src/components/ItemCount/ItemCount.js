import React, { useState } from "react";
import Button from '@mui/material/Button';

const ItemCount = ({ stock }) =>{


     /*Agregar/quitar stock en ItemCount*/
    const [ count, setCount ] = useState(1);

    const addCount = ( ) => {
        stock>count && setCount(count+1);
    }

    const removeCount = () => {
        1<count && setCount(count-1);
    }

    
    

    return(
        <div className="itemCount">
            <Button onClick={ removeCount }>-</Button>
            <p>{ count }</p>
            <Button onClick={ addCount }>+</Button>
        </div>
    )
}

export default ItemCount;