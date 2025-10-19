import React, { useEffect, useState } from 'react';
import BooksPageHeader from '../components/BooksPageHeader';
import BooksPageSideBar from '../components/BooksPageSideBar';
import axios from 'axios';
import './Bookspage.css';
import {useNavigate} from 'react-router-dom';

function BooksPage() {
  const [books,setBooks] = useState([]);
  const [filteredbooks,setFilteredBooks] = useState([]);
  const navigate = useNavigate();
  // make backend call to get books purchased by the current user who is logged in
  const userId = localStorage.getItem('userId') || null;
  const token = localStorage.getItem('token') || null;
  const [searchTerm,setSearchTerm] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8001/api/v1/books',{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
       .then((res) => {
        console.log(res);
        const booksFetched = res.data?.details;
        setBooks(booksFetched);
        setFilteredBooks(booksFetched);
       })
       .catch((err) => {
        console.error(err);
       })  
  },[token]);
       
  useEffect(() => {
      const booksFiltered = books.filter((book) => {
              const lowerSearchTerm = searchTerm.toLowerCase();
              const lowerTitle = book.title.toLowerCase();
              return lowerTitle.includes(lowerSearchTerm);
              });
      setFilteredBooks(booksFiltered);
  },[searchTerm]);

  return (
    <div className='BooksPage'>
      <BooksPageHeader searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
      <div className='BooksPageMainContainer'>
        <BooksPageSideBar/>
        <div className='BooksPageMain'>
          {          
          filteredbooks.map((book,idx) => (
              <div key={idx} className='Book'>
                <img className= "book_img" src={book.imgUrl} alt="" 
                onClick={() => navigate(`/books/${book._id}`)}/>
                <p>{book.title}</p> 
                <p>{book.author}</p>
              </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default BooksPage