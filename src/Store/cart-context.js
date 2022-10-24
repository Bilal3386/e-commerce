import React from "react"

const CartContext = React.createContext({
    items: [],
    quantity: 0,
    itemQuantity: 0,
    totalAmount: 0,
    loader: false,
    addItem: (item) => {},
    removeItem: (id) => {},
})

export default CartContext;