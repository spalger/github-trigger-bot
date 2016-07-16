import { createServer } from 'http'
import { resolve } from 'path'

import dotenv from 'dotenv'
import Koa from 'koa'
import SocketIO from 'socket.io'
import views from 'koa-views'

import router from './routes'
import { Es, errorHandler } from './lib'

dotenv.config()
const app = new Koa
const server = createServer(app.callback())
app.io = new SocketIO(server)
app.es = new Es

app.use(errorHandler())
app.use(views(resolve(__dirname, 'views'), {
  extension: 'pug',
}))
app.use(router.routes())

server.listen(process.env.PORT || 3000)
