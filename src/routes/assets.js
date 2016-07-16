import { resolve } from 'path'

import { Router } from '../lib'

export const assets = new Router()

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const SEND_OPTS = {
  maxAge: 30 * DAY,
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
