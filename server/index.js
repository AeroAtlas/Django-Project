//Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
var mongoose = require("mongoose");

//Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

//Connect to local MongoDB
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/vampdb", { useNewUrlParser: true });

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
