import React from 'react';
import './BooksPageHeader.css';

function BooksPageHeader(props) {
  function searchHandler(e){
    const searchTerm = e.target.value;
    console.log(searchTerm);
    props.setSearchTerm(searchTerm);
  }
  return (
    <div className='BooksPageHeader'>
      <div className='BooksPageHeaderSearch'>
        <span>Kindle</span>
        <input type="text" placeholder='Search your Kindle' onChange={(e) =>searchHandler(e)} value={props.searchTerm}/>
      </div>
      <div className='BooksPageHeaderOpts'>
        <span>filter</span>
        <span>sort by</span>
        <span>checkout</span>
        <span>signout</span>
      </div>
    </div>
  )
}

export default BooksPageHeader