import express from 'express';
import db from '../db.js';

const router = express.Router();

//to get to-do's
router.get('/',(req,res)=>{});

//to create/add new to-do's
router.post('/',(req,res)=>{});

//to update a to-do
router.put('/:id',(req,res)=>{}); // :id is dynamic query parameter  

//to delete a to-do
router.delete('/:id',(req,res)=>{});

export default router;