import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const router = new Router()

router.get('/ping', cntx => {
  cntx.body = 'pong'
})

router.post('/github/webhook', async ctx => {
  console.log(ctx.request.body)
})

// uses async arrow functions
app.use(async (ctx, next) => {
  try {
    await next() // next is now a function
  } catch (err) {
    ctx.body = { message: err.message }
    ctx.status = err.status || 500
  }
})

app.use(router.routes())

app.listen(process.env.PORT || 3000)
