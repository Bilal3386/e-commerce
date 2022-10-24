import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import Button from "../UI/Button";
import Model from "../UI/Model";
import classes from "./Cart.module.css";
import CartCloseButton from "./CartCloseButton";
import CartItems from "./CartItems";
import Spinner from "react-bootstrap/Spinner";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  
 
  
  
       
    
  // },[authCtx.email, cartCtx] )
  

  console.log(cartCtx.totalAmount)
 
  const cartItemsList = cartCtx.items.map((item) => (
    <ul key={item.id} className={classes.ul}>
     {item && <CartItems  product={item} />}
    </ul>
  ));

  return (
    <Model onClose={props.onClose}>
      <CartCloseButton className={classes.close} onClose={props.onClose} />
      <div className={classes.total}>
        <h2>Cart</h2>
        <div className={classes.wrapper}>
          <span className={classes.item}>ITEM</span>
          <span className={classes.price}>PRICE</span>
          <span className={classes.quantity}>QUANTITY</span>
        </div>
        {!cartCtx.loader && <Spinner
              style={{
                 height: '2rem',
                 width: '2rem',
                 margin: '1rem auto',
                justifyContent: "center",
                alignItems: "center",
              }}
              animation="border"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>}
        {cartCtx.loader && <div>
          {cartItemsList}
          <span className={classes["cart-total"]}>
          <span>${cartCtx.totalAmount}</span>
            <strong>Total</strong>
          </span>
        </div>}
        {cartCtx.loader && <Button>Purchase</Button>}
      </div>
    </Model>
  );
};

export default Cart;

// const cartElements = [
  //   {
  //     title: "Colors",
  //     price: 100,
  //     imageUrl:
  //       "https://prasadyash2411.github.io/ecom-website/img/Album%201.png",
  //     quantity: 2,
  //   },

  //   {
  //     title: "Black and white Colors",
  //     price: 50,
  //     imageUrl:
  //       "https://prasadyash2411.github.io/ecom-website/img/Album%202.png",
  //     quantity: 3,
  //   },

  //   {
  //     title: "Yellow and Black Colors",
  //     price: 70,
  //     imageUrl:
  //       "https://prasadyash2411.github.io/ecom-website/img/Album%203.png",
  //     quantity: 1,
  //   },
  // ];

  // useEffect(() => {
  // const userEmailId = authCtx.email.split(".").join("");
  // const cleanEmail = userEmailId.split("@").join("");
  //  const fetch = async () => {
  //   const res = await axios.get(`https://crudcrud.com/api/12cb9f3a8de64c88be37a109940785b4/cart${cleanEmail}`)
  
  //   cartCtx.items = res.data
  //   const quantity = res.data.reduce((ack, item) =>{
  //     return ack + item.quantity
  // }, 0)
  // cartCtx.itemQuantity(quantity)
  //   // cartCtx.itemQuantity = 
  //   setList(res.data)
  //   console.log(cartCtx.itemQuantity)
  //   console.log(cartCtx.items)
  //  }

  //  fetch()
  // fetch(
  //   `https://crudcrud.com/api/bdb298c082bb44b991688362e187c0fa/cart${cleanEmail}`
  // )
  //   .then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     } else {
  //       return res.json().then((data) => {
  //         throw new Error(data.error.message);
  //       });
  //     }
  //   })
  //   .then((data) => {
  //     cartCtx.items = data;
  //    console.log(cartCtx.items)
     
  //   })
  // .catch((err) => {
  //   alert(err);
  // });