const express = require('express')
const config = require('config')
//const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))

app.use('/', require('./routes/form.routes.js'))

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
  } catch (e) {
    console.log('server Error', e.message)
    process.exit(1)
  }
}

start()
