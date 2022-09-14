import React, { Fragment } from "react";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = props => {
  return (
    <Fragment>
      <button className={classes.button} onClick={props.onClick}>
        Cart <span className={classes.span}>0</span>
      </button>
    </Fragment>
  );
};

export default HeaderCartButton;
