const express = require('express')
const app = express();
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
const { errorHandler } = require('./middleware/errorMiddleware')

require('dotenv').config()

const port = process.env.PORT || 5000;

connectDB();

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/post', require('./routes/postRoutes'))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})