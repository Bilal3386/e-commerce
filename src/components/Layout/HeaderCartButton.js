import React, { Fragment, useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";
import { GiShoppingCart } from "react-icons/gi";
import AuthContext from "../../store/auth-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext)
  const logoutHandler = () => {
    authCtx.logout()
  }
  return (
    <Fragment>
    <div className={classes.container}><button className={classes.logout} onClick={logoutHandler}>LogOut</button>
      <button className={classes.button} onClick={props.onClick}>
        <GiShoppingCart size="20" /> Cart{" "}
        <span className={classes.span}>{cartCtx.itemQuantity}</span>
      </button></div>
    
    </Fragment>
  );
};

export default HeaderCartButton;
