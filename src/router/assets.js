import { resolve } from 'path'

import ms from 'ms'

import { Router } from '../utils'

export const assets = new Router()
const SEND_OPTS = {
  maxAge: ms('30 days'),
  root: resolve(__dirname, '../../'),
}
const paths = {
  '/blaze.css': 'node_modules/blaze/dist/blaze.min.css',
}

assets.use(async (req, res, next) => {
  const path = paths[req.url]
  if (path) {
    res.sendFile(path, SEND_OPTS)
  } else {
    next()
  }
})
