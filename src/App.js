import React, { useContext, useState, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Spinner from "react-bootstrap/Spinner";
import Footer from "./components/Layout/Footer";
import classes from "./App.module.css";
import CartProvider from "./store/CartProvider";
import AuthContext from "./store/auth-context";

const Home = React.lazy(() => import("./pages/Home"));
const AvailableItem = React.lazy(() =>
  import("./components/Items/AvailableItem")
);
const ProductDetail = React.lazy(() => import("./pages/ProductDetails"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const About = React.lazy(() => import("./pages/About"));
const Auth = React.lazy(() => import("./pages/Auth"));
function App() {
  const [showCart, setShowCart] = useState(false);
  const authCtx = useContext(AuthContext);
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
        <Suspense
          fallback={
            <div className={classes.spinner}>
              <Spinner
              style={{
                flex: 1,
                textAlign: 'center',
              }}
              animation="border"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            </div>
            
          }
        >
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/store" exact>
              {authCtx.isLoggedIn && <AvailableItem />}
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
            </Route>
            <Route path="/store/:productDetails">
              {authCtx.isLoggedIn && <ProductDetail />}
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Auth />
            </Route>
            <Route path="/contact-us">
              {authCtx.isLoggedIn && (
                <ContactUs onAddUserQuery={userQueryHandler} />
              )}
              {!authCtx.isLoggedIn && <Redirect to="/login" />}
            </Route>
          </Switch>
        </Suspense>
      </main>
      <div className={classes["footer-container"]}>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
