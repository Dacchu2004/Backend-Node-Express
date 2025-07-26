
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';


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
        insertTodo.run(result.lastInsertRowid, defaultTodo);

        //creating the token
        

    }catch(err){
        console.log(err.message);
        return res.status(503).send('Error registering the user');
    }

});

//for login
router.post('/login',(req,res)=>{});

export default router;