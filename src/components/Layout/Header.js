import React, { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
  return (
    <Fragment>
      <header className={classes.header}>
        <a href="#blank">HOME</a>
        <a href="#blank">STORE</a>
        <a href="#blank">ABOUT</a>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes.container}>
        <h1>The Generics</h1>
      </div>
    </Fragment>
  );
};

export default Header;
