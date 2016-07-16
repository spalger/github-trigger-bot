import { resolve } from 'path'

import Router from 'koa-router'
import send from 'koa-send'

export const assets = new Router()

const root = resolve(__dirname, '../../')
const paths = {
  'blaze.css': 'node_modules/blaze/dist/blaze.min.css',
}

assets.get('/:asset*', async (cntx) => {
  const path = paths[cntx.params.asset]
  if (path) await send(cntx, path, { root })
})
