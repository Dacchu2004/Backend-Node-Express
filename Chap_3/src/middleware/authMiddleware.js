// This middleware will be used in the routes to protect them and get the user id from the token
// It will be used in the todoRoutes.js file to get the todos for the logged in user
// and also to create, update and delete todos for the logged in user
import jwt from 'jsonwebtoken';

function authMiddleware(req,res,next){
    const token = req.headers['authorization']; //get the token from the request headers
    if(!token) {return res.status(401).json({message: "No Token Found!"})}

    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(401).json({message:"Inavlid Token..!"})
        }
        req.userId = decoded.id; //set the user id in the request object
        next(); //call the next middleware or route handler
    }) 
}

export default authMiddleware;
