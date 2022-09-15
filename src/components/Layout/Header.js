import React, { Fragment } from "react";
import {NavLink} from 'react-router-dom'
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <NavLink activeClassName={classes.active} to="/home">HOME</NavLink>
        <NavLink activeClassName={classes.active} to="/blank">STORE</NavLink>
        <NavLink activeClassName={classes.active} to="/about">ABOUT</NavLink>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes.container}>
        <h1>The Generics</h1>
      </div>
    </Fragment>
  );
};

export default Header;
