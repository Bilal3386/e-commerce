import React, { Fragment, useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext)

  let quantity = 0 
  cartCtx.items.forEach(item => 
    {
      quantity=quantity+ Number(item.quantity)
    }
  )


  return (
    <Fragment>
      <button className={classes.button} onClick={props.onClick}>
        Cart <span className={classes.span}>{quantity}</span>
      </button>
    </Fragment>
  );
};

export default HeaderCartButton;
