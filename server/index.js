//Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
var mongoose = require("mongoose");
//{path: path/filename}

//Usable express
const app = express();

//Middleware 
app.use(bodyParser.json());
app.use(cors());
//Create static folder
// app.use(express.static("public"));

//Connect to local MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/vampdb", { useNewUrlParser: true });

//Port
const port = process.env.PORT || 5000;

//Go to folder Routes/api/posts for post requests using express
const posts = require('./routes/api/posts');

//Add /api/posts to all post requests
app.use('/api/posts', posts);


//Start server
app.listen(port, () => console.log(`Server started on port ${port}`));




