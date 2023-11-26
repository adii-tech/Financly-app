import React from 'react';
import noTransactions from '../assets/noTransaction.svg';

const NoTransactions = () => {
  return (
    <div 
     style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        flexDirection:"column",
        marginBottom:"2rem",
     }}
    >
       <img src={noTransactions} style={{width:"400px", margin:"1rem"}}/>
       <p style={{textAlign:"center", fontSize:"1.2rem", fontWeight:"bolder"}}>
        You Have No Transaction Currently
       </p>
    </div>
  )
}

export default NoTransactions;
