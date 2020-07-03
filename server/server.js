const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const sockets = require('./socket')
const server = require('./listen') 

const PORT = 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/www'))

sockets.connect(io, PORT)
server.listen(http, PORT)