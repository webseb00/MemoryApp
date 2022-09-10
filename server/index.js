const express = require('express')
const app = express();
const connectDB = require('./config/db')
require('dotenv').config()

const port = process.env.PORT || 5000;

connectDB();

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})