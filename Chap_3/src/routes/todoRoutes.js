import express from 'express';
import db from '../db.js';

const router = express.Router();

//to get to-do's for logged in user
router.get('/',(req,res)=>{
    const getTodos= db.prepare(`SELECT * FROM todos WHERE user_id=?`);
    const todos = getTodos.all(req.userId); //req.userId is set by the auth middleware, which is not shown here
    res.json(todos); //send todos to the client
});

//to create/add new to-do's
router.post('/',(req,res)=>{});

//to update a to-do
router.put('/:id',(req,res)=>{}); // :id is dynamic query parameter  

//to delete a to-do
router.delete('/:id',(req,res)=>{});

export default router;