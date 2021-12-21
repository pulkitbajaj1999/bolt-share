const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const connectDB = require('./utils/database')
connectDB()

//set static folder
app.use(express.static('./public'))

// setting view-engine
app.set('view engine', 'ejs')

// use body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// ROUTES
const filesRoutes = require('./routes/files')

// redirect to landing page
app.get('/', (req, res, next) => {
  return res.redirect('/files/upload')
})
app.use('/files', filesRoutes)
app.use('/test', (req, res, next) => {
  res.render('email')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
