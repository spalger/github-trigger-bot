import Router from 'koa-router'

import { github } from './github'
import { assets } from './assets'

const router = new Router()

router.get('/', async cntx => {
  await cntx.render('index')
})

router.get('/ping', cntx => {
  cntx.body = 'pong'
})

router.use('/github', github.routes())
router.use('/assets', assets.routes())

export default router
