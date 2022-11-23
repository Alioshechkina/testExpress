const express = require('express')
const package = require('./package.json')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const app = express()
const router = express.Router()
const db = require('./db')
const jwt =require('jsonwebtoken')
const version = package.version
const User = require('./models/users')

dotenv.config()

app.use(bodyParser.json())

app.get('/health', (req, res) => {
  res.status(200).send({ status: "OK", version })
})

app.post('/register', async(req, res, next) => {
  const fullName = req.body.fullName
  const email    = req.body.email
  const password = req.body.password

  const user = await User.create({
    fullName,
    email,
    passwordHash: password
  })

  //const token = jwt.sign({id: newUser._id})
  const salt        = await bcrypt.genSalt(10)
  user.passwordHash = await bcrypt.hash(user.passwordHash, salt)
  const doc         = await user.save()

  res.status(201).send(doc)
})

app.post('/login', async(req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({ email })
  const isValid = await bcrypt.compare(password, user.passwordHash)
  if (!isValid) {
    res.status(400).send('Something broke!');
  }
  else {
    function generateAccessToken(payload) {
      return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1800s' })
    }
    const token = generateAccessToken({ userId: user._id })

    res.status(200).json({
      authToken: token,
    })
  }
})

app.get('/readMyUser', async(req, res, next) => {
  const authHeader = req.headers.auth
  if (!authHeader) {
     res.status(400).send('There is no Token!');
  }
  else {
    const { userId } = jwt.verify(authHeader, process.env.TOKEN_SECRET)
    const user = await User.findOne({ _id: userId })


    res.status(200).json({
      fullName: user.fullName,
    })
  }
})




const port = 3000
app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})


