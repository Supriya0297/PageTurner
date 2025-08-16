import {verifyToken} from '../utils/tokenUtils.js'

export async function validateToken(req,res,next){
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  try {
    const token = authHeader.split(" ")[1];
    console.log("token",token);
    //verify token
    const payload = await verifyToken(token);
    console.log("payload",payload);
    req.token = token;
    req.userId = payload.id;
  } catch (error) {
    return res.status(401)
            .json({message:"invalid token"
                 , details: {error}});

  }
  next(); // route it to actual router for ex: bookRouter
}