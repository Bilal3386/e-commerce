import { useState } from "react";
import Cart from './components/Cart/Cart'
import AvailableItem from "./components/Items/AvailableItem";
import Header from "./components/Layout/Header";
import Footer from './components/Layout/Footer'
import classes from './App.module.css'
import CartProvider from "./Store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false)

  const showCartHandler = () => {
    setShowCart(true);
  }

  const hiddenCartHandler = () => 
  {
    setShowCart(false)
  }

  return (
    <CartProvider>
    {showCart && <Cart onClose = {hiddenCartHandler}/>}
    <Header onShowCart={showCartHandler} />
      <main>
        <AvailableItem />
      </main>
      <div className={classes['footer-container']}>
     <Footer />
     </div>
    </CartProvider>
  );
}

export default App;
