import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button";
import Model from "../UI/Model";
import classes from "./Cart.module.css";
import CartCloseButton from "./CartCloseButton";
import CartItems from "./CartItems";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
 const [list, setList] = useState([])
  
  // const cartElements = [
  //   {
  //     title: "Colors",
  //     price: 100,
  //     imageUrl:
  //       "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  //     quantity: 2,
  //   },

  //   {
  //     title: "Black and white Colors",
  //     price: 50,
  //     imageUrl:
  //       "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  //     quantity: 3,
  //   },

  //   {
  //     title: "Yellow and Black Colors",
  //     price: 70,
  //     imageUrl:
  //       "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  //     quantity: 1,
  //   },
  // ];

  useEffect(() => {
  const userEmailId = authCtx.email.split(".").join("");
  const cleanEmail = userEmailId.split("@").join("");
   const fetch = async () => {
    const res = await axios.get(`https://crudcrud.com/api/7e9d27647369489e8d020117ed4609c6/cart${cleanEmail}`)
  
    cartCtx.items = res.data
    
    // cartCtx.itemQuantity = 
    // setList(data)
    console.log(cartCtx.items)
   }

   fetch()
  // fetch(
  //   `https://crudcrud.com/api/bdb298c082bb44b991688362e187c0fa/cart${cleanEmail}`
  // )
  //   .then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     } else {
  //       return res.json().then((data) => {
  //         throw new Error(data.error.message);
  //       });
  //     }
  //   })
  //   .then((data) => {
  //     cartCtx.items = data;
  //    console.log(cartCtx.items)
     
  //   })
  // .catch((err) => {
  //   alert(err);
  // });
  
       
    
  },[authCtx.email, cartCtx] )
  
  
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  console.log(cartCtx.items)
  const cartItemsList =cartCtx.items.map((item) => (
    <ul className={classes.ul}>
      <CartItems product={item} />
    </ul>
  ));

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
          <span className={classes["cart-total"]}>
            <span>${totalAmount}</span>
            <strong>Total</strong>
          </span>
        </div>
        <Button>Purchase</Button>
      </div>
    </Model>
  );
};

export default Cart;
