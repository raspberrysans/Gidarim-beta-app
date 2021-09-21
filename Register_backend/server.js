const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routeURLS = require('./Routes/routes');
const cors = require('cors');

dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, 
    ()=> console.log('database connection established'));
    
app.use(express.json());
app.use(cors());
app.use('/app', routeURLS)
app.listen(4000, () => console.log("server is up and running"));