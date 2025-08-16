import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import './SignUpPage.css';

function SignUpPage() {
  const [username,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [messageDetails,setMessageDetails] = useState({status:"success", message:""});
  const navigate = useNavigate();

  function validatePassword(){
    console.log(password,confirmPassword);
    if (!password || password.length < 6 ){
      console.log("passwords should atleast 6 characters");
      setMessageDetails({status: "error", 
                         message:"password should be atleast 6 characters"});
      return false;
    }
    if (!confirmPassword || confirmPassword.length < 6 ){
      setMessageDetails({status: "error", 
                         message:"confirm password should be atleast 6 characters"});
      return false;
    }
    if (password !== confirmPassword){
      setMessageDetails({status: "error", 
                         message:"passwords do not match"});
      return false;
    }
    return true;
  }

  function validateUserName(){
    console.log(username);
    if (!username){
      setMessageDetails({status: "error", 
                         message:"name cannot be empty"});
      return false;
    }
    if (username.split(" ").length !== 2){
      setMessageDetails({status: "error", 
                         message:"Enter first name followed by last name"});
      return false;
    }
    return true;
  }
  
  
  function validateEmail(){
    console.log(email);
    if (!email){
      setMessageDetails({status: "error", 
                         message:"email should not be empty"});
      return false;
    }
    return true;
  }
  
  
  function signUpHandler(e){
    e.preventDefault();
    console.log(username,email,password,confirmPassword);
    if(!validateUserName() || !validateEmail() || !validatePassword()){
      return;
    };
    // make backend call signup api
    axios.post('http://localhost:8000/api/v1/auth/signup',{
    "name": username,
    "email": email,
    "password": password
    }).then( (res) => {
      console.log("received response from signup call",res);
      const data = res.data;
      console.log(res.status);
      if (res.status !== 200){
        setMessageDetails({status: "error",
                         message: data.message});
        return;
      }
      setMessageDetails({status: "success",
                         message: "User Registration is successful, redirecting to sign in page..."})
      // navigate to sign in
      setTimeout(() => navigate("/signin"), 2000);
    } ).catch((err) => {
      console.log(err);
      setMessageDetails({status: "error",
                         message: err.response?.data?.message});
        return;
    })
  }
  return (
    <div className='SignUpPage'>
      <img id = "amazon_kindle_logo" src="https://images-na.ssl-images-amazon.com/images/G/31/kfw/landing/img_logo_DKBL._TTD_.png" alt="" />
      <form action="">
        <h3>Create Account</h3>
        <label htmlFor="username">Your name</label>
        <input id = "username" name= "username" type="text" placeholder= "First and last name" onChange={ (e) => setUserName(e.target.value)} />

        <label htmlFor="email">Email</label>
        <input id = "email" name= "email" type="text"  onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="password">Password</label>
        <input id = "password" name= "password" type="password" placeholder= "Atleast 6 characters" onChange={(e) => setPassword(e.target.value)}/>
        
        <label htmlFor="confirm_password">Password again</label>
        <input id = "confirm_password" name= "confirm_password" type="password"  onChange={(e) => setConfirmPassword(e.target.value)}/>
        
        <span id="message" style = {
          { color: messageDetails.status === "error" ? "red" : "green"}}>{messageDetails?.message}</span>

        <button type="submit" onClick={(e) => signUpHandler(e)}>Create your Amazon Account</button>

      </form>


    </div>
  )
}

export default SignUpPage