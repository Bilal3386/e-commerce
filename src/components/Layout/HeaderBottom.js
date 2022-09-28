import React from 'react'
import classes from "./Header.module.css";

const HeaderBottom = props => {
  return (
    <div className={classes.container}>
        <h1>THIS IS WILLY'S WEBSITE. </h1>
        {props.children}
      </div>
  )
}

export default HeaderBottom