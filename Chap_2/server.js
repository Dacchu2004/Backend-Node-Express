
const express=require('express');
const app = express();
const PORT = 3000;

app.get('/',(req,res)=>{
    console.log("Request received",req.method);
    res.send('<h1>Welcome to the Home Page</h1>');
});

app.get('/dashboard',(req,res)=>{
    res.send('<h1>Welcome to the Dashboard</h1>');
})

app.get('/api/data',(req,res)=>{
    res.send(data);
});
let data={
    name: "John Doe",
    age: 30,
    occupation: "Software Engineer"
}

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));