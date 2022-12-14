import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import HeaderBottom from "./HeaderBottom";
import AuthContext from "../../store/auth-context";


const Header = (props) => {
  const authCtx = useContext(AuthContext)
  const isLogin = authCtx.isLoggedIn
  return (
    <Fragment>
      <header className={classes.header}>
        <NavLink exact activeClassName={classes.active} to="/">
          HOME
        </NavLink>
        <NavLink activeClassName={classes.active} to="/store">
          STORE
        </NavLink>
        <NavLink activeClassName={classes.active} to="/about">
          ABOUT
        </NavLink>
        {!isLogin && <NavLink activeClassName={classes.active} to="/login">
          LOGIN
        </NavLink>}
        {isLogin &&<NavLink activeClassName={classes.active} to="/contact-us">
          CONTACT-US
        </NavLink>}
        {isLogin && <HeaderCartButton onClick={props.onShowCart} />}
        
      </header>
      <HeaderBottom />
    </Fragment>
  );
};

export default Header;
