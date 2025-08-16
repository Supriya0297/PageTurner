import React from 'react';
import SignInPage from './SignInPage';

function ProtectedRoute(props) {
  const token = localStorage.getItem('token') || null;
  let isLoggedIn = token !== null;
  const component = props.component;
  console.log(component);
  // TODO: check expiry of token
  if (isLoggedIn){
    return ({component})
  }else{
  return (<SignInPage />)
  }
}
export default ProtectedRoute