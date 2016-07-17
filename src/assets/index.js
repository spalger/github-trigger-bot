import { resolve } from 'path'

import browserify from 'browserify-middleware'
import ms from 'ms'

import { Router } from '../utils'

const router = new Router()

const SEND_OPTS = {
  maxAge: ms('30 days'),
  root: resolve(__dirname, '../../'),
}

const paths = {
  '/blaze.css': 'node_modules/blaze/dist/blaze.min.css',
}

browserify.settings.production('cache', '7 days')
browserify.settings({
  transform: ['babelify'],
})

router.get('/github-events.js', browserify(resolve(__dirname, '../github-events/bundle/index.js')))

router.use(async (req, res, next) => {
  const path = paths[req.url]
  if (path) {
    res.sendFile(path, SEND_OPTS)
  } else {
    next()
  }
})

export default router
