import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../UI/Button";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");

  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-HV4z4G81M-3pUBgWC3xl0pKYCIcxm2c",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken, data.email);
       // console.log(data)
        history.replace("/store");
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <section className={classes.wrapper}>
      <h2>LOGIN</h2>
      <form onSubmit={submitHandler} className={classes["login-form"]}>
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" required ref={emailInputRef} />
        <label htmlFor="password">Your Password</label>
        <input type="password" id="password" required ref={passwordInputRef} />
        {!isLoading && <Button>LOGIN</Button>}
        {isLoading && <p>Sending request....</p>}
      </form>
    </section>
  );
};

export default AuthForm;
