import { resolve } from 'path'

import express from 'express'
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

router.use('/bundles', express.static(resolve(__dirname, '../bundles'), SEND_OPTS))
router.use(async (req, res, next) => {
  const path = paths[req.url]
  if (path) {
    res.sendFile(path, SEND_OPTS)
  } else {
    next()
  }
})

export default router
