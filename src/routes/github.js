import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

const router = new Router()

router.use(bodyParser())

router.post('/webhook', async ctx => {
  ctx.body = ctx.request.body
})


export { router as github }
