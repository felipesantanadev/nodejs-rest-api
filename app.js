const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

// Middlewares
app.use(bodyParser.json()); // All the body requests will be converted to json

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECTION, 
                 { useNewUrlParser: true, useUnifiedTopology: true }, 
                 (result) => {
                     console.log(process.env.MONGODB_CONNECTION);
                    console.log(result);
                 }
                );

// Import Routes
const postsRoute = require('./routes/posts');

// Middlewares
app.use('/posts', postsRoute); // All the routes started with /posts will be handled by postsRoute

// Listenning
app.listen(3000);