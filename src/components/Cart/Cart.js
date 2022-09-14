import React from "react";

import Button from "../UI/Button";
import Model from "../UI/Model";
import classes from "./Cart.module.css";
import CartCloseButton from "./CartCloseButton";
import CartItems from "./CartItems";


const Cart = (props) => {
  const cartElements = [
    {
      title: "Colors",
      price: 100,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
      quantity: 2,
    },

    {
      title: "Black and white Colors",
      price: 50,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
      quantity: 3,
    },

    {
      title: "Yellow and Black Colors",
      price: 70,
      imageUrl:
        "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
      quantity: 1,
    },
  ];

  const cartItemsList = cartElements.map((item) => (
    <ul className={classes.ul}>
    <CartItems product={item}/>
    </ul>
  ))


  return (
    <Model onClose={props.onClose}>
      <CartCloseButton className={classes.close} onClose={props.onClose} />
      <div className={classes.total}>
        <h2>Cart</h2>
        <div className={classes.wrapper}>
          <span className={classes.item}>ITEM</span>
          <span className={classes.price}>PRICE</span>
          <span className={classes.quantity}>QUANTITY</span>
          </div>
        
        <div>
        {cartItemsList}
        <span className={classes['cart-total']}><span>$12.36</span><strong>Total</strong></span>
        </div>
        <Button>Purchase</Button>
        </div>
    </Model>
  );
};

export default Cart;
