import React from "react";
import Button from "../UI/Button";
import classes from "./Items.module.css";

const Items = (props) => {
  const price = `$${props.data.price}`;
  return (
    <li>
      <div className={classes.container}>
        <div>
          <h3>{props.data.title}</h3>
          <img src={props.data.imageUrl} alt="items images " />
        </div>
        <div className={classes.wrapper}>
          <span>{price}</span>
          <Button>Add TO CART</Button>
        </div>
      </div>
    </li>
  );
};

export default Items;
