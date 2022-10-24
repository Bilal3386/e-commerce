import ReactDOM from 'react-dom'
import React from "react"
import classes from './Model.module.css'


const ModalOverlay = props => {
  return <div className={classes.model}>
    <div className={classes.content}>{props.children}</div>
  </div>;
};
const Model = props => {
  return ReactDOM.createPortal(<ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>, document.getElementById('overlay-root'))
};

export default Model;
