import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export async function generateToken(userId){
  return jsonwebtoken.sign( {id: userId}, 
    process.env.JWT_SECRET, {expiresIn: '7d'}
  );
}

export async function verifyToken(token){
  return jsonwebtoken.verify(token, process.env.JWT_SECRET);
}