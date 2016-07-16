import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import Joi from 'joi'

import { validate } from '../lib'

const router = new Router()

router.use(bodyParser({
  enableTypes: ['json'],
}))

router.post('/webhook',

  validate('body', Joi.object({
    action: Joi.string().valid('create'),
  })),

  async ctx => {
    ctx.body = ctx.request.body
  }
)


export { router as github }
