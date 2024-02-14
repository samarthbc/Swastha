const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')
const path = require('path')
const multer = require('multer')

connectToMongo();
const app = express()
const port = 5000


// Middleware to parse to json
// app.use(express.json)

// Enabling cors for all routes
app.use(cors(
  {
    origin: ["https://swastha.vercel.app"],
    methods: ["POST","GET","DELETE","PUT"],
    credentials:true
  }
))
// Enable CORS for all OPTIONS requests
app.options('*', cors()); 


// Setting up public as a static folder
app.use(express.static(path.join(__dirname,'public')))


// Available Routes are divided into seperate files for each cateory of routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/docauth', require('./routes/docauth'))
app.use('/api/appointment', require('./routes/appointment'))
app.use('/api/blog', require('./routes/blog'))
app.use('/api/shopitem', require('./routes/shopitem'))

// '/' of backend (testing purposes)
app.get("/",(req,res)=>{
  res.json("Swastha Backend running.....")
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})