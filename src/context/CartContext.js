import React, { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider= ({ children }) =>{



    const [ cartWidgetItems , setCartWidgetItems ] = useState([]);

    const addItemToCart = (item) =>{
        
        if( isInCart( item.id ) ){  

            const itemDuplicated = cartWidgetItems.find(( itemFind ) => itemFind.id === item.id);
            const { stockCount } = itemDuplicated;

            itemDuplicated.stockCount = item.stockCount + stockCount;

            setCartWidgetItems( cartWidgetItems )

        } else {

            !cartWidgetItems.includes(item) && setCartWidgetItems([...cartWidgetItems,item]);
        }

    }

    const isInCart = ( id ) =>{
        return  cartWidgetItems.some(( item ) => item.id === id )
    }

    const removeCartItem = (id) => {
        return cartWidgetItems.find(( item )  => item.id !== id )
    }

    const clearCartWidget = () => {
        setCartWidgetItems([]);
    }


    const data = {
        cartWidgetItems,
        addItemToCart,
        clearCartWidget,
        removeCartItem,
        isInCart
    }

    return(
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    )
}
export { CartProvider };
export default CartContext;