const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sqlite = require('sqlite3');

const app = express();

if (process.env.ENV === 'Test') {
  console.log('this is a TEST');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test');
} else {
  const db = mongoose.connect('mongodb://localhost/bookAPI');
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');

//  const bookRouter = express.Router(); direct way
// book router module returns route function. We execute it with the Book model.
const bookRouter = require('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Nodemon API');
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
