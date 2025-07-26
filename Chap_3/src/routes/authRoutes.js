
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';


const router = express.Router();

//for signup and register
router.post('/register',(req,res)=>{
    const{username,password}=req.body; // v destruceted body to {username,password} to fetch the req data directly
    console.log(username,password);
    res.sendStatus(201);
});

//for login
router.post('/login',(req,res)=>{});

export default router;