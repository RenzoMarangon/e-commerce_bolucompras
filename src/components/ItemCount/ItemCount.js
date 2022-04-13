import React, { useState } from "react";
import Button from '@mui/material/Button';

const ItemCount = ({ stock, addStock, count }) =>{


    const addCount = () => {
        count <= stock && addStock( count + 1 )
    }

    const removeCount = () => {
        count > 1 && addStock( count - 1 )
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