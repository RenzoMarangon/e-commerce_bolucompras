import React, { createContext, useState } from "react";

const CartContext = createContext();

const CartProvider= ({ children }) =>{



    const [ cartWidgetItems , setCartWidgetItems ] = useState([]);

    const addItemToCart = (item) =>{

        const { category, description, id, image, price, stockCount, title } = item;
        const itemCustom = {
            category: category,
            description: description,
            id: id,
            image: image,
            price: price,
            stockCount: stockCount,
            title:title,
        }
        
        if( isInCart( item.id ) ){  

            const itemDuplicated = cartWidgetItems.find(( itemFind ) => itemFind.id === item.id);
            const { stockCount } = itemDuplicated;

            itemDuplicated.stockCount = item.stockCount + stockCount;

            setCartWidgetItems( cartWidgetItems )

        } else {
            
            /*Convierto el objeto que traigo de FireStore en un objeto con menos datos*/
    
            !cartWidgetItems.includes(item) && setCartWidgetItems([...cartWidgetItems,itemCustom]);
        }





    }

    const isInCart = ( id ) =>{
        return  cartWidgetItems.some(( item ) => item.id === id )
    }

    const removeCartItem = (id) => {
        setCartWidgetItems( cartWidgetItems.filter(( item )  => item.id !== id ) )
    }

    const clearCartWidget = () => {
        setCartWidgetItems([]);
    }

    const totalAddCartItemCount = () => {
        return cartWidgetItems.reduce( ( acum, item ) => acum = acum + (item.stockCount * item.price), 0 )
    }

    const cartItemCount = () => {
        return cartWidgetItems.reduce( ( acum, item ) =>  acum += item.stockCount, 0 )
    }

    const data = {
        cartWidgetItems,
        addItemToCart,
        clearCartWidget,
        removeCartItem,
        isInCart,
        cartItemCount,
        totalAddCartItemCount,
        setCartWidgetItems
    }

    return(
        <CartContext.Provider value={data}>
            {children}
        </CartContext.Provider>
    )
}
export { CartProvider };
export default CartContext;