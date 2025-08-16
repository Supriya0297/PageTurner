import User from '../models/User.js';
import { encryptPassword,verifyPasswords } from '../utils/passUtils.js';
import { generateToken } from '../utils/tokenUtils.js';

export async function signUp(req,res){
  const {email, name, password} = req.body;
  console.log(name, email, password);
  if (!name || !email || !password){
    return res.status(400)
              .json({message:"request object is incomplete. Please provide name, email, password"
                  , details: {name,email,password}});
  }
  const existingUser = await User.findOne({email: email});
  console.log(existingUser);
  if(existingUser){
    return res.status(400)
              .json({message:"user already exists"
                  , details: {name,email,password}});
  }
  const encrypted_pass = await encryptPassword(password);
  const newUser = new User({name,email,password: encrypted_pass});
  const savedUser = await newUser.save();
  return res.status(200)
            .json({message:"user signuped successfully"
                  , details: savedUser});
} 


export async function signIn(req,res){
  console.log(req.body);
  const {email, password} = req.body;
  console.log(email, password);
  if (!email || !password){
    return res.status(400)
              .json({message:"request object is incomplete. Please provide email, password"
                  , details: {email,password}});
  }

  const existingUser = await User.findOne({email: email});
  console.log(existingUser);
  if(!existingUser){
    return res.status(400)
              .json({message:"user doesnt exist.Please sign up first"
                  , details: email});
  }
  const isValidPassword = await verifyPasswords(password,existingUser.password);
  console.log("isValidPassword",isValidPassword)
  if(!isValidPassword){
    return res.status(400)
              .json({message:"incorrect username or password"
                  , details: email});
  }
  const token = await generateToken(existingUser.id);
  return res.status(200)
            .json({message:"user signed successfully"
                  , details: {token}});
} 