import React from "react"

const CartContext = React.createContext({
    items: [],
    quantity: 0,
    itemQuantity: (quantity) => {},
    totalAmount: '',
    addItem: (item) => {},
    removeItem: (id) => {},
})

export default CartContext;