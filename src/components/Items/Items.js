import React, {useContext} from "react";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button";
import classes from "./Items.module.css";

const Items = (props) => {

  const cartCtx = useContext(CartContext)

  const price = `$${props.data.price}`;

  const addItemHandler = () => {
    cartCtx.addItem({...props.data, quantity: 1})
  }


  return (
    <li key={props.data.id} id={props.id}>
      <div className={classes.container}>
        <div>
          <h3>{props.data.title}</h3>
          <img src={props.data.imageUrl} alt="items images " />
        </div>
        <div className={classes.wrapper}>
          <span>{price}</span>
          <Button onClick={addItemHandler}>Add TO CART</Button>
        </div>
      </div>
    </li>
  );
};

export default Items;
