import { useState } from "react";
import { Route } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import AvailableItem from "./components/Items/AvailableItem";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import classes from "./App.module.css";
import CartProvider from "./store/CartProvider";
import About from "./pages/About";
import Home from './pages/Home'

function App() {
  const [showCart, setShowCart] = useState(false);
  

  const showCartHandler = () => {
    setShowCart(true);
  };

  const hiddenCartHandler = () => {
    setShowCart(false);
  };

  return (
    <CartProvider>
      {showCart && <Cart onClose={hiddenCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Route path="/home">
          <Home />
        </Route>
        <Route path='/store'>
        <AvailableItem />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </main>
      <div className={classes["footer-container"]}>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
