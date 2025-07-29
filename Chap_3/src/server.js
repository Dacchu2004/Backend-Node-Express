  
import express from 'express';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

//Get the file path of the current module
const __filename = fileURLToPath(import.meta.url);

// Get the directory name from the fie path
const __dirname = dirname(__filename);

// Middlewares
app.use(express.json()); //Parses incoming JSON and puts it in req.body
app.use(express.static(path.join(__dirname,'../public')));

app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

//Routes
app.use('/auth',authRoutes);
app.use('/todos',authMiddleware,todoRoutes);

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})