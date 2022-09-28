import { useContext, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import AvailableItem from "./components/Items/AvailableItem";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import classes from "./App.module.css";
import CartProvider from "./store/CartProvider";
import About from "./pages/About";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import ProductDetail from "./pages/ProductDetails";
import Auth from "./pages/Auth";
import AuthContext from "./store/auth-context";

function App() {
  const [showCart, setShowCart] = useState(false);
  const authCtx = useContext(AuthContext)
  const showCartHandler = () => {
    setShowCart(true);
  };

  const hiddenCartHandler = () => {
    setShowCart(false);
  };

  const userQueryHandler = async (obj) => {
    try {
      const response = await fetch(
        "https://e-commerce-cb528-default-rtdb.firebaseio.com/userQuery.json",
        {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Something Went wrong");
      }
      const data = response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartProvider>
      {showCart && <Cart onClose={hiddenCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/store" exact>
          {authCtx.isLoggedIn &&  <AvailableItem />}
          {!authCtx.isLoggedIn && <Redirect to='/login' />}
          </Route>
          <Route path="/store/:productDetails">
          {authCtx.isLoggedIn && <ProductDetail />}
          {!authCtx.isLoggedIn && <Redirect to="/login"/>}
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path='/login'>
            <Auth />
          </Route>
           <Route path="/contact-us">
           {authCtx.isLoggedIn && <ContactUs onAddUserQuery={userQueryHandler} />}
           {!authCtx.isLoggedIn && <Redirect to="/login"/>}
          </Route>
        </Switch>
      </main>
      <div className={classes["footer-container"]}>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
