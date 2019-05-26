const express = require('express')
const users = require('./routes/api/users')
const profiles = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const app = express()
const path = require('path')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDb Connected'))
  .catch(err => console.log(err))
//Passport Middleware
app.use(passport.initialize())
//Passport Config
require('./config/passport')(passport)

//Use Routes
app.use('/api/users', users)
app.use('/api/profile', profiles)
app.use('/api/posts', posts)
//Serve Static Assests if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/public'))
}
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'))
})
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
