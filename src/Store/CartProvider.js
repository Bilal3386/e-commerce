import axios from "axios";
import React, { useContext, useState } from "react";
import AuthContext from "./auth-context";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const [items, updatedItems] = useState([]);
  console.log(items)
 const [quantity, setQuantity] = useState(0)
  const addItemsToCartHandler = async (product) => {
    console.log(product)

    const userEmailId = authCtx.email.split(".").join("");
    const cleanEmail = userEmailId.split("@").join("");
    const url = `https://crudcrud.com/api/1da26a23c386416da5a73b9c06f3c606/cart${cleanEmail}`;

    const newArray = [...items]
    console.log(newArray)

    const idx = newArray.findIndex((i) => {
      console.log(i)
      if (i.id === product.id)
      {
        return i
      }
    })
    console.log(idx)
    if (idx === -1) {
      try{
      const res = await axios.post(url, product)
      updatedItems([...items, product])
      console.log(res)
      }
      catch (err)
      {
        console.log(err)
      }
    }
    else {
      
      try{
        const res = await axios.get(url)
        const mapProduct = res.data.findIndex((item) => {
          if(item.title === product.title)
          {
            return product
          }
        } )
        console.log(res.data[mapProduct])
        console.log('items')
      console.log(idx)
      let fetchProduct = res.data[mapProduct]
      let updatedProduct = {...fetchProduct, quantity: fetchProduct.quantity + 1 }
      let temp = updatedProduct._id
      console.log(temp)
      delete updatedProduct._id
      //console.log([...updatedProduct])
      const res1 = await axios.put(url+`/${temp}`, updatedProduct)
      console.log(res1.data)
      updatedItems([updatedProduct])
    }
      catch (err)
      {
        console.log(err)
      }
    }
}
  //     fetch(url, {
  //           method: 'POST',
  //           body: JSON.stringify(product),
  //           headers: {
  //             'Content-Type':'application/json'
  //           }
  //         }).then(res => {
  //           if(res.ok){
  //             return res.json()
  //           }else{
  //             return res.json().then(data => {
  //               throw new Error(data.error.message)
  //             })
  //           }
  //         }).then(data=> {
  //           setId(data._id)
  //           //console.log(data)
  //           updatedItems([...items, product]);
  //         }).catch(err => {
  //           alert(err)
  //         })
  // } else {
  //   // const temp = newArray[idx].quantity = newArray[idx].quantity+1
  //   newArray[idx] = {...newArray[idx], quantity: Number(newArray[idx].quantity) + Number(product.quantity)}
  //   fetch(url+`/${id}`, {
  //     method: 'PUT',
  //     body: JSON.stringify({...newArray[idx]}),
  //     headers: {
  //       'Content-Type':'application/json'
  //     }
  //   }).then(res => {
  //     console.log(res)
  //     if(res.ok){
  //       res.json().then(data => {
  //         console.log(data)
  //       })
  //     }else{
  //       return res.json().then(data => {
  //         throw new Error(data.error.message)
  //       })
  //     }
  //   }).then(data=> {
  //     setId(data._id)
  //     //newArray[idx] = {...newArray[idx], quantity: newArray[idx].quantity+product.quantity}
  //     updatedItems([...newArray]);
  //   }).catch(err => {
  //     //alert(err)
  //     console.log(err)
  //   })


    // let newArray = [...items];
    // newArray.forEach((item, ind) => {
    //   if (item.id === product.id) {
    //     hasItem = true;
    //     newArray[ind].quantity =
    //       Number(newArray[ind].quantity) + Number(product.quantity);
    //   }
    // });
    // if (hasItem === false) {
    //   //console.log(product)
    //   fetch(url, {
    //     method: 'POST',
    //     body: JSON.stringify(product),
    //     headers: {
    //       'Content-Type':'application/json'
    //     }
    //   }).then(res => {
    //     if(res.ok){
    //       return res.json()
    //     }else{
    //       return res.json().then(data => {
    //         throw new Error(data.error.message)
    //       })
    //     }
    //   }).then(data=> {
    //     //console.log(data)
    //   }).catch(err => {
    //     alert(err)
    //   })
    //   updatedItems([...items, product]);
    // } else {
    //   updatedItems(newArray);
    //     };
      
    const quantityHandler = quantity => {
      setQuantity(quantity)
    }

  const removeItemHandler = (id) => {};

  const cartItems = {
    items: items,
    quantity: quantity,
    itemQuantity: quantityHandler,
    totalAmount: items.reduce((ack, item) => {
      return (ack += item.price * item.quantity);
    }, 0),
    addItem: addItemsToCartHandler,
    removeItem: { removeItemHandler },
  };
  return (
    <CartContext.Provider value={cartItems}>
      {/* {console.log(cartItems.items)} */}
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
