
const express=require('express');
const app = express();
const PORT = 3000;

let data=["James" ];


// Middleware to parse JSON bodies
app.use(express.json());

app.get('/',(req,res)=>{
    console.log("Request received",req.method);
    res.send(`
        <body style="background: lightblue;
        color: black;">
        <h1>Data</h1>
        <p>${JSON.stringify(data)}</p>
        <a href="/dashboard">Go to Dashboard</a>
        </body>
        <script>
        console.log("Welcome to the home page");</script>
        `);
});

app.get('/dashboard',(req,res)=>{
    res.send(`
        <body>
        <h1>Welcome to the Dashboard</h1>
        <a href="/">Go back to Home</a>
        </body>`);
});

app.get('/api/data',(req,res)=>{
    res.send(data);
});

//post
app.post('/api/data',(req,res)=>{
    const newData = req.body;
    console.log("New data received:", newData);
    data.push(newData.name);
    res.sendStatus(201); // Created
});

app.delete('/api/data',(req,res)=>{
    data.pop();
    console.log("Deleted");
    res.sendStatus(203);
});

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));