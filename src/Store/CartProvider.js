import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./auth-context";
import CartContext from "./cart-context";
let initial = true;
const CartProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const [items, updatedItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const userEmailId = authCtx.email?.split(".").join("");
  const cleanEmail = userEmailId?.split("@").join("");

  useEffect(() => {
    setIsLoading(false)
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-cb528-default-rtdb.firebaseio.com/${cleanEmail}.json`
        );
        console.log(response.data);
        setIsLoading(true)
        response.data === null ? updatedItems([]) : updatedItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartItems();
  }, [cleanEmail]);
  const addItemsToCartHandler = async (product) => {
    console.log(product);
    let hasItem = false;
    const newItemArray = [...items];

    newItemArray.forEach((ele, indx) => {
      console.log(ele.id);
      if (product.id === ele.id) {
        hasItem = true;
        newItemArray[indx].quantity =
          newItemArray[indx].quantity + product.quantity;
      }
    });
    if (hasItem === false) {
      updatedItems([...items, product]);
    } else {
      updatedItems(newItemArray);
      console.log("has item", newItemArray);
    }
  };
  const removeItemHandler = async (id) => {
    const existingItems = [...items];
    existingItems.forEach(async (item, ind) => {
      if (item.id === id) {
        if (item.quantity === 1) {
          console.log("i've got one item ", id);
          existingItems.splice(ind, 1);
          updatedItems(existingItems);
        } else {
          item.quantity--;
          updatedItems(existingItems);
        }
      }
    });
  };
  useEffect(() => {
    const amountHandler = () => {
      if (!initial) {
        initial = true;
        return;
      }
      const existingItems = [...items]
      const temp  = existingItems.reduce((prev, curr) => prev += curr.price * curr.quantity, 0)
      setTotalAmount(temp)
      console.log(temp)
    }
    amountHandler()
   }, [items, totalQuantity])
  useEffect(() => {
    const quantityHandler = () => {
      if (!initial) {
        initial = true;
        return;
      }
      const existingItems = [...items];
      const quantity = existingItems.reduce(
        (ack, item) => item.quantity + ack,
        0
      );
      setTotalQuantity(quantity);
      console.log(existingItems);
    };
    quantityHandler();
  }, [items]);
  useEffect(() => {
    const addingItems = async () => {
      if (!initial) {
        initial = true;
        return;
      }
      try {
        const response = await axios.put(
          `https://e-commerce-cb528-default-rtdb.firebaseio.com/${cleanEmail}.json`,
          items
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    addingItems();
  }, [cleanEmail, items]);

  const cartItems = {
    items: items,
    itemQuantity: totalQuantity,
    totalAmount: totalAmount,
    loader: isLoading,
    addItem: addItemsToCartHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartItems}>
      {/* {console.log(cartItems.items)} */}
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
// const existingItems = [...items];
// existingItems.find((item) => item.id === id);
// if (existingItems.quantity === 1) {
//   console.log('quantity is 1')
//   existingItems.splice(0, 1);
//   try {
//     const response = await axios.delete(
//       `https://e-commerce-cb528-default-rtdb.firebaseio.com/${cleanEmail}/${id}.json`,
//     );
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// }
// if (existingItems.quantity >= 1) {
//   existingItems.quantity--;
// }
// };
//console.log(items);
// const newArray = [...items];
// console.log(newArray);

// const idx = newArray.findIndex((i) => {
//   console.log(i);
//   if (i.id === product.id) {
//     return i;
//   }
// });
// console.log(idx);
// console.log(product)
// if (idx === -1) {
//   try {
//     const res = await axios.post(`https://e-commerce-cb528-default-rtdb.firebaseio.com/cart/${cleanEmail}.json`, product);
//     //updatedItems([...newArray, product]);
//     console.log(res.data);
//   } catch (err) {
//     console.log(err);
//   }
// } else {
//   try {
//     const res = await axios.get(url);
//     const mapProduct = res.data.findIndex((item) => {
//       if (item.id === product.id) {
//         return product;
//       }
//       return null;
//     });
//     console.log(res.data[mapProduct]);
//     console.log("items");
//     console.log(idx);
//     let fetchProduct = res.data[mapProduct];
//     let updatedProduct = {
//       ...fetchProduct,
//       quantity: fetchProduct.quantity + 1,
//     };
//     let temp = updatedProduct._id;
//     console.log(temp);
//     delete updatedProduct._id;
//     //console.log([...updatedProduct])
//     const res1 = await axios.put(url + `/${temp}`, updatedProduct);
//     console.log(res1.data);
//     updatedItems([updatedProduct]);
//   } catch (err) {
//     console.log(err);
//   }
// }

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
