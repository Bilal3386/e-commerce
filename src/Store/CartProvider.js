import React, {useState} from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
    const [items, updatedItems] = useState([])

    const addItemsToCartHandler = (product) => {
        let hasItem = false
        let newArray = [...items]
        newArray.forEach((item, ind)=> 
            {
                if(item.id === product.id)
                {
                    hasItem = true
                    newArray[ind].quantity = Number(newArray[ind].quantity) + Number(product.quantity) 
                }
            });
       hasItem === false ? updatedItems([...items, product]): updatedItems(newArray)
    }

    const removeItemHandler = (id) => 
    {

    }

  const cartItems = {
    items: items,
    itemQuantity: 0,
    totalAmount: items.reduce((ack, item) => {
        return (ack+=item.price * item.quantity)
    }, 0),
    addItem: addItemsToCartHandler,
    removeItem: {removeItemHandler},
  };

  return (
    <CartContext.Provider value={cartItems}>
    {console.log(cartItems.items)}
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
