require('dotenv').config()

const mongoose = require('mongoose')

function connectDB() {
  mongoose.connect(process.env.MONGO_CONNECTION_URI)

  const connection = mongoose.connection

  connection.once('open', () => {
    console.log('Database connected!')
  })
}

module.exports = connectDB
