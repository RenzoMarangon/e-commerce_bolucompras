/*HOOKS*/
import React, { useState } from "react";

/*Material UI*/
import Button from '@mui/material/Button';

const ItemCount = ({ stock, addStock, count }) =>{


    const addCount = () => {
        count <= stock && addStock( count + 1 )
    }

    const removeCount = () => {
        count > 1 && addStock( count - 1 )
    }


    return(
        <div className="button-stockCount">
            <Button onClick={ removeCount }>-</Button>
            <p>{ count }</p>
            <Button onClick={ addCount }>+</Button>
        </div>
    )
}

export default ItemCount;