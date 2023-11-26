import React from 'react';
import './styles.css';

const Buttons = ({text, onClick, blue}) => {
  return (
    <div className={blue? "btn btn-blue" : "btn"} onClick={onClick}>
       {text}
    </div>
  )
}

export default Buttons;
