const express = require('express')
const users = require('./routes/api/users')
const profiles = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const app = express()
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
mongoose
  .connect(db)
  .then(() => console.log('MongoDb Connected'))
  .catch(err => console.log(err))
app.get('/', (req, res) => res.send('Hello'))

//Use Routes
app.use('/api/users', users)
app.use('/api/profile', profiles)
app.use('/api/posts', posts)
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
