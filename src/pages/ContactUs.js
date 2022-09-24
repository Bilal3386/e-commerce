import React, { useRef } from "react";
import Button from "../components/UI/Button";
import classes from "./ContactUs.module.css";

const ContactUs = (props) => {
  const nameRef = useRef("");
  const emailIdRef = useRef("");
  const phoneNumberRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();
    const productArr = {
      name: nameRef.current.value,
      emailId: emailIdRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
    };
    props.onAddUserQuery(productArr);
  };
  return (
    <section className={classes.wrapper}>
       <h2>CONTACT-US</h2>
       <div className={classes.control}>
      <form  onSubmit={submitHandler}>
        <label htmlFor="title">Name</label>
        <input type="text" id="title" placeholder="Enter your name.." ref={nameRef} />
        <label htmlFor="opening-text">Email-Id</label>
        <input  type="text" name="openingText" placeholder="Enter your email-id.." ref={emailIdRef} />
        <label>Phone Number</label>
        <input type="number" placeholder="Enter your phone number.." name="releasingDate" ref={phoneNumberRef} />
        <Button>SUBMIT</Button>
      </form>
      </div>
    </section>
  );
};

export default ContactUs;
