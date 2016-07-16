import { createServer } from 'http'
import { resolve } from 'path'

import Koa from 'koa'
import SocketIO from 'socket.io'
import views from 'koa-views'

import router from './routes'
import { errorHandler } from './lib'


const app = new Koa
const server = createServer(app.callback())
app.io = new SocketIO(server)

app.use(errorHandler())
app.use(views(resolve(__dirname, 'views'), {
  extension: 'pug',
}))
app.use(router.routes())

server.listen(process.env.PORT || 3000)
