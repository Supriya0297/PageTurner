import React from 'react';
import {Link} from 'react-router-dom';
import './BooksPageSideBar.css';

function BooksPageSideBar() {
  return (
    <div className='BooksPageSideBar'>
      <Link>All Titles</Link>
      <Link>Books</Link>
      <Link>Comics</Link>
      <Link>Samples</Link>
    </div>
  )
}

export default BooksPageSideBar