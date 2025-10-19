import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import './SignInPage.css';

function SignInPage() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [messageDetails,setMessageDetails] = useState({status:"success", message:""});
  const navigate = useNavigate();

  function validateEmail(){
    console.log(email);
    if (!email){
      setMessageDetails({status: "error", 
                         message:"email should not be empty"});
      return false;
    }
    return true;
  }

  function validatePassword(){
    console.log(password);
    if (!password || password.length < 6 ){
      console.log("passwords should atleast 6 characters");
      setMessageDetails({status: "error", 
                         message:"password should be atleast 6 characters"});
      return false;
    }
    return true;
  }

  function signInHandler(e){
    e.preventDefault();
    console.log(email,password);
    if(!validateEmail() || !validatePassword()){
      return;
    };
    // make backend call signin api
    axios.post('http://localhost:8001/api/v1/auth/signin',{"email": email, "password": password})
         .then( (res) => 
          {
            console.log("received response from signin call",res);
            const data = res.data;
            console.log(res.status);
            if (res.status !== 200){
              setMessageDetails({status: "error",
                              message: data.message});
              return;
            }
            const token = data.details?.token;
            const userId = data.details?.userId;
            localStorage.setItem('token',token);
            localStorage.setItem('userId',userId);
            setMessageDetails({status: "success",
                         message: "User SignIn is successful, redirecting to books page..."})
      // navigate to books in
      setTimeout(() => navigate("/books"), 2000);
    } ).catch((err) => {
      console.log(err);
      setMessageDetails({status: "error",
                         message: err.response?.data?.message});
        return;
    })
    
  }

  return (
    <div className='SignInPage'>
      <img id = "amazon_kindle_logo" src="https://images-na.ssl-images-amazon.com/images/G/31/kfw/landing/img_logo_DKBL._TTD_.png" alt="" />
      
      <form action="">
        <h3>Sign In</h3>
        <label htmlFor="email">Email</label>
        <input id = "email" name= "email" type="text"  onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input id = "password" name= "password" type="password" placeholder= "Atleast 6 characters" onChange={(e) => setPassword(e.target.value)}/>
        <span id="message" style = {
          { color: messageDetails.status === "error" ? "red" : "green"}}>{messageDetails?.message}</span>
        <button type="submit" onClick={(e) => signInHandler(e)}>Sign In</button>
      </form>
      <hr />
      <span>New to Amazon?</span>
      <button id="Header__signUp" onClick={() => navigate('/signup')}>
            Create an Amazon Account
      </button>
    </div>
  )
}

export default SignInPage