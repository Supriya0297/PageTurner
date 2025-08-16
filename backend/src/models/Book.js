import mongoose from 'mongoose';
// step1: define a schema
const bookSchema = mongoose.Schema({
  title : {type: String, required:true},
  author : {type: String, required:true}
  }, 
  {collection: "books_coll"}
);
// step2: create model of this schema
const Book = mongoose.model("Book",bookSchema);
export default Book;