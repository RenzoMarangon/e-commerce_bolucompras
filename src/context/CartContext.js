import React, { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider= ({ children }) =>{

    const [ cartWidgetItems , setCartWidgetItems ] = useState([]);

    const addItemToCart = (item) =>{

        setCartWidgetItems([...cartWidgetItems,item])
        console.log(cartWidgetItems)
    }

    const data = {
        cartWidgetItems,
        addItemToCart
    }

    return(
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    )
}
export { CartProvider };
export default CartContext;