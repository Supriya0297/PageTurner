import mongoose from "mongoose";

// define schema
const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  booksPurchased: {type: Array}
}, {collection : "user_coll"});

// define model 
const User = mongoose.model("User",userSchema);
export default User;