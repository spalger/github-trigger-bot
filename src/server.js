import { createServer } from 'http'
import { resolve } from 'path'

import 'babel-polyfill'
import dotenv from 'dotenv'
import express from 'express'
import SocketIO from 'socket.io'

import { router } from './router'
import { getEs, errorHandler } from './lib'

dotenv.config()
const app = express()
const server = createServer(app)
app.io = new SocketIO(server)
app.es = getEs()

app.set('views', resolve(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(router)
app.use(errorHandler())

server.listen(process.env.PORT || 3000)
