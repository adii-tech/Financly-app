import React, { useEffect } from 'react';
import "./style.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import userImg from '../../assets/user.svg';

const Header = () => {
  const[user, loading]=useAuthState(auth);
 const navigate= useNavigate();
  useEffect(()=>{
    if(user){
       navigate("/dashboard");
    }
  },[user,loading]);

  function logoutFuc(){
    try{
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("Logged Out.");
        navigate("/");

      }).catch((error) => {
        // An error happened.
        toast.error(error.message);
      });  
    }catch(e){
      toast.error(e.message);
    }
      
  }  

  return (
    <div className='navbar'>
         <p className='logo'>Financly.</p>
         {user&& (
          <div style={{display:"flex", alignItems:"center", gap:"0.5rem"}}>
            <img src={user.photoURL?user.photoURL:userImg}
              style={{borderRadius:"50%",height:"2rem", width:"2rem"}}/>
         <p className="logo link" onClick={logoutFuc}>Logout</p>
         </div>
         )}
    </div>
  )
}

export default Header;
