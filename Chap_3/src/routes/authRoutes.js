
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';


const router = express.router();

//for signup and register
router.post('/register',(req,res)=>{});

//for login
router.post('/login',(req,res)=>{});

export default router;