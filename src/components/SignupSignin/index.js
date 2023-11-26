import React from 'react';
import "./style.css";
import Input from '../Input';
import { useState } from 'react';
import Buttons from '../Button';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { toast } from 'react-toastify';
import {db, auth, provider, doc, setDoc} from "../../firebase.js";
import { useNavigate } from 'react-router-dom';
import {getDoc} from "firebase/firestore";

const SignupSignin = () => {
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [confirmpassword, setConfirmpassword]=useState("");
  const[loading, setLoading]=useState(false);
  const[loginform, setLoginform]=useState(false);
  const navigate=useNavigate();

  function signupWithEmail(){
   setLoading(true);
   if(name!=""&& email!=""&&password!=""&&confirmpassword!=""){
    if(password==confirmpassword){
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log('user- ', user);
        toast.success("user created!")
        setName("");
        setEmail("");
        setPassword("");
        setConfirmpassword("");
        createDoc(user);
        navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
    }else{
      toast.error("Password and Confirmpassword not match!");
    }
  }else{
      toast.error("all filds are mendatory!");
      setLoading(false);
    }
  }

  function googleAuth(){
  try{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      createDoc(user);
      navigate("/dashboard");
      toast.success("User Authenticated!");
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage)
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

  }catch(e){
    toast.error(e.message);
  }
  }
  async function createDoc(user){
  if(!user) return;

  const userRef= doc(db, "users", user.uid);
  const userData= await getDoc(userRef); 

   if(!userData.exists()){
   try{
    await setDoc(doc(db, "users", user.uid), {
      naem: user.displayName ? user.displayName:name,
      email: user.email,
      photoURL: user.photoURL? user.photoURL: "", 
     createdAt: new Date(),
    });
    toast.success("Doc created!");
   }
   catch(e){
    toast.error(e.message);
   }}else{
    toast.error("The doc alredy exixt!")
   }
  }
  function loginUsingEmail(){
    if(email!=""&&password!=""){
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    toast.success("User Logged in");
    navigate("/dashboard");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
  });
    }
    else{
      toast.error("All fildes are mandetory!")
    }
  }

  return (
    <>
    { loginform ? ( 
      <div className='wrapper-signup'>
    <h2 className='title'>
      Login on <span style={{color: "var(--theme)"}}>Financly.</span>
    </h2>
    <form>
      <Input lable={"Email"} state={email} setState={setEmail} placeholder={"JohnDoe121@gmail.com"} type={'email'} />
      <Input lable={"Password"} state={password} setState={setPassword} placeholder={"JohnDoe@123"} type={"password"}  />

      <Buttons text={"Login Using Email and Password"} onClick={loginUsingEmail}/>
      <p style={{textAlign:"center"}}>or</p>
      <Buttons text={"Login Using Google"} onClick={googleAuth} blue={true}/>
      <p style={{textAlign: "center", margin:0, cursor:"pointer"}} onClick={()=>setLoginform(!loginform)} >
        Or Don't Have An Account? Click Here. 
      </p>
    </form>
</div>
):(
   <div className='wrapper-signup'>
          <h2 className='title'>
            Sign up on <span style={{color: "var(--theme)"}}>Financly.</span>
          </h2>
          <form>
            <Input lable={"Full Name"} state={name} setState={setName} placeholder={"John Doe"} />
            <Input lable={"Email"} state={email} setState={setEmail} placeholder={"JohnDoe121@gmail.com"} type={'email'} />
            <Input lable={"Password"} state={password} setState={setPassword} placeholder={"JohnDoe@123"} type={"password"}  />
            <Input lable={"Confirm Password"} state={confirmpassword} setState={setConfirmpassword} placeholder={"JohnDoe@123"} type={"password"}  />
            <Buttons text={"Signup Using Email and Password"} onClick={signupWithEmail}/>
            <p style={{textAlign:"center"}}>or</p>
            <Buttons text={"Signup Using Google"} onClick={googleAuth} blue={true}/>
            <p style={{textAlign: "center", margin:0, cursor:"pointer"}} onClick={()=>setLoginform(!loginform)} >
                  Or Have An Account Alredy? Click Here. 
          </p>
          </form>
    </div> 
    )
  }
</>
  )
}

export default SignupSignin;
