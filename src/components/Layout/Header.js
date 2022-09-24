import React, { Fragment, useContext} from "react";
import {NavLink} from 'react-router-dom'
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import HeaderBottom from "./HeaderBottom";
import AuthContext from "../../store/auth-context";

const Header = props => {
  const authCtx = useContext(AuthContext)
 
  return (
    <Fragment>
      <header className={classes.header}>
       <NavLink activeClassName={classes.active} to="/">HOME</NavLink>
       {authCtx.isLoggedIn && <NavLink activeClassName={classes.active} to="/store">STORE</NavLink>}
        {authCtx.isLoggedIn && <NavLink activeClassName={classes.active} to="/about">ABOUT</NavLink>}
        {!authCtx.isLoggedIn && <NavLink activeClassName={classes.active} to="/login">LOGIN</NavLink>}
        {authCtx.isLoggedIn && <NavLink activeClassName={classes.active} to="/contact-us">CONTACT-US</NavLink>}
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <HeaderBottom/>
    </Fragment>
  );
};

export default Header;
