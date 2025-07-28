
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import { send } from 'process';


const router = express.Router();

//for signup and register
router.post('/register',(req,res)=>{
    const{username,password}=req.body; // v destruceted body to {username,password} to fetch the req data directly

    //encrypt the password
    const hashedPassword = bcrypt.hashSync(password,8); // 8 is the salt rounds

    //store the user in the database
    try{
        const insertUser = db.prepare('INSERT INTO users(username,password) VALUES(?,?)')
        const result = insertUser.run(username, hashedPassword); //saves this user in the database

        //i want  to add their 1st todo for them
        const defaultTodo =`Hello ${username} :) Add your first todo!`;
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES(?,?)`);
        insertTodo.run(result.lastInsertRowid, defaultTodo); //lastInsertRowid gives the id of the last inserted row or recently created user

        //creating the token
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn:'24h'}); //signing the token with user id and secret key
        res.json({token}); 

    }catch(err){
        console.log(err.message);
        return res.status(503).send('Error registering the user');
    }

});

//for login
router.post('/login',(req,res)=>{
    const {username, password}=req.body;

    try{
        const getUser=db.prepare('SELECT * FROM users WHERE username=?');
        const user = getUser.get(username); //get the user from the database

        if(!user) { return res.status(404).send({message:"User Not Found!!"})}

        const passwordIsValid = bcrypt.compareSync(password,user.password); //compare the password with the hashed password in the database but the password will to converted to the hased and then its is compared
        if(!passwordIsValid){return res.status(401).send({message:"Invalid Password!!"})}
        console.log(user);

        //creating the token
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn:'24h'}); //signing the token with user id and secret key
        res.json({token}); //send the token to the client

    }catch(err){
        console.log(err.message);
        return res.status(503).send('Error logging in the user');
    }
});

export default router;