import { createServer } from 'http'
import { resolve } from 'path'

import 'babel-polyfill'
import dotenv from 'dotenv'
import express from 'express'
import bunyan from 'bunyan'
import SocketIO from 'socket.io'

import { router } from './router'
import { getEs, errorHandler } from './utils'
import { GithubEvents } from './github-events'

dotenv.config()
const app = express()
const server = createServer(app)
app.io = new SocketIO(server)
app.es = getEs()
app.events = new GithubEvents(app.es, app.io)
app.log = bunyan.createLogger({ name: 'github-trigger' })

app.set('views', resolve(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(router)
app.use(errorHandler())

server.listen(process.env.PORT || 3000, () => {
  app.log.info({ addr: server.address() }, 'server listening')
})
