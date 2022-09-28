import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import HeaderBottom from "./HeaderBottom";

const Header = (props) => {
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
        <NavLink activeClassName={classes.active} to="/login">
          LOGIN
        </NavLink>
        <NavLink activeClassName={classes.active} to="/contact-us">
          CONTACT-US
        </NavLink>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <HeaderBottom />
    </Fragment>
  );
};

export default Header;
