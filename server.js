
const express = require('express')
const connectDb = require('./config/db')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());

connectDb()
app.get('/', (req, res) => {
  res.send("API Running")
})

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

app.use('/api/posts', require('./routes/api/posts'))

app.use('/api/profile', require('./routes/api/profile'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server is running"))