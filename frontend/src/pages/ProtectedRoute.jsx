import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute(props) {
  const token = localStorage.getItem('token') || null;
  //console.log(props);
  const component = props.children;
  //console.log(component);
  // TODO: check whether the token is valid or not
  if (token !== null){
    return component;
  }else{
    return <Navigate to="/signin" />;
  }

}
export default ProtectedRoute