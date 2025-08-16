import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="ErrorPage">
      <h1>SORRY</h1>
      <h2>We Couldnt find that page</h2>
      <p>try searching or go to amazon's <Link to="/">home page</Link></p>
    </div>
  )
}

export default ErrorPage