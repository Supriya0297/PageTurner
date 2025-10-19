import Book from '../models/Book.js'
import User from '../models/User.js';
import {generateSummary} from '../utils/aiUtils.js';
import {extractTextFromPdf} from '../utils/pdfUtils.js'

export async function getAllBooks(req,res) {
  // filter based on user - req.userId
  const currentUser = await User.findById(req.userId);
  console.log("currentUser",currentUser);
  const booksPurchased = currentUser.booksPurchased;
  console.log("booksPurchased",booksPurchased,typeof(booksPurchased));
  const books = await Book.find({});
  console.log("books",books,typeof(books));
  let purchasedBooks = [];
  for(const book of books){
    const bookId = book._id;
    console.log("book._id",bookId);
    const bookIdStr = bookId.toString();
    console.log("bookIdStr",bookIdStr,typeof(bookIdStr));
    console.log("booksPurchased.indexOf(bookIdStr)",booksPurchased.indexOf(bookIdStr));
    if (booksPurchased.indexOf(bookIdStr) != -1){
      purchasedBooks.push(book);
    }
  }
  console.log(purchasedBooks);
  res.status(200)
     .json({"message": "books", details: purchasedBooks});
}
export async function getBookById(req,res) {
  console.log(`searching for book with id ${req.params.id}`);
  const book = await Book.findOne({"_id": req.params.id});
  res.status(200)
     .json({"message": "book", details: book});
}

export async function addBook(req,res) {
  console.log(req.body);
  const {title,author} = req.body;
  const newBook = new Book({title,author});
  // const newBook = new Book(req.body);
  const savedBook = await newBook.save(); // persistence
  res.status(201)
     .json({message: "book added successfully",
            details:savedBook});
}

export async function getBookSummary(req,res){
  const bookId = req.params.id;
  console.log(bookId);
  const book = await Book.findOne({"_id": req.params.id});
  if (book.summary === ""){
    // extract text from books - pdfs 
    const text = await extractTextFromPdf(book.pdfUrl);
    
    // invoke AI model to generate summary and store the summary in mongodb
    book.summary = await generateSummary(text);
    
    // persistence
    const savedBook = await book.save(); 
  } 
   // return a json containing book id and summary
  return res.status(200)
            .send({"id": book.id, "summary": book.summary})
};
