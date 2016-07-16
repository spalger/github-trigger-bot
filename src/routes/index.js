import Router from 'koa-router'

import { github } from './github'

const router = new Router()

router.get('/ping', cntx => {
  cntx.body = 'pong'
})

router.use('/github', github.routes())

export default router
