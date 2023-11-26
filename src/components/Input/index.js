import React from 'react';
import "./styles.css";

const Input = ({lable, state, setState, placeholder, type}) => {
  return (
    <div className='input-wrapper'> 
       <p className='lable-input'>{lable}</p>
       <input className='custom' 
       type={type}
       value={state}
       placeholder={placeholder}
       onChange={(e)=>setState(e.target.value)}
       />
    </div>
  )
}

export default Input;
