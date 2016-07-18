import { createServer } from 'http'
import { resolve } from 'path'

import dotenv from 'dotenv'
import express from 'express'
import bunyan from 'bunyan'
import SocketIO from 'socket.io'
import { try as attempt } from 'bluebird'

import { router } from './router'
import { getEs, errorHandler } from './utils'
import { GithubEvents } from './github-events'
import { GithubApi } from './github-api'
import { GithubBot } from './github-bot'

attempt(async () => {
  dotenv.config()
  const app = express()
  const server = createServer(app)

  app.io = new SocketIO(server)
  app.es = getEs()
  app.log = bunyan.createLogger({ name: 'github-trigger', level: 'debug' })
  app.ghEvents = new GithubEvents(app.es, app.io)
  app.ghApi = new GithubApi(app.log)
  app.ghBot = new GithubBot(app.log, app.ghApi)
  await app.ghBot.init()

  app.set('views', resolve(__dirname, 'views'))
  app.set('view engine', 'pug')
  app.use(router)
  app.use(errorHandler())

  server.listen(process.env.PORT || 3000, () => {
    app.log.info({ addr: server.address() }, 'server listening')
  })
}).done()
