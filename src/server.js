import Koa from 'koa'

import router from './routes'

const app = new Koa()

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
