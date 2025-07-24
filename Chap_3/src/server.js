  
import express from 'express';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

//Get the file path of the current module
const __filename = fileURLToPath(import.meta.url);

// Get the directory name from the fie path
const __dirname = dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname,'../public')));

app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})