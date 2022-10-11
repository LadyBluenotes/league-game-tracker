const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path: './config/.env'});

const summonerRoutes = require('./routes/summoner.routes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', summonerRoutes);

app.listen(process.env.PORT || 8000, () =>{
    console.log('Server is running.')
})