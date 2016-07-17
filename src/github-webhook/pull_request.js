import Joi from 'joi'

import { Router } from '../utils'
import { validateEventData } from '../github-event'

const router = new Router()

router.post('/pull_request',
  validateEventData(Joi.object().keys({
    action: Joi.string().valid('opened'),
    pull_request: Joi.object({
      url: Joi.string().uri().description('api url'),
      id: Joi.number().description('api/object id'),
      number: Joi.number().description('repo-relative number'),
      state: Joi.string().valid('open', 'closed'),
      user: Joi.object({
        login: Joi.string().description('username'),
        url: Joi.string().uri().description('api url'),
      }),
      head: Joi.object().description('latest user commit').keys({
        sha: Joi.string(),
      }),
      base: Joi.object().description('target branch').keys({
        ref: Joi.string().description('branch name'),
        sha: Joi.string(),
      }),
    }),
    repository: Joi.object().keys({
      full_name: Joi.string().description('org/project formatted name'),
    }),
  })),

  async (req, res) => {
    res.json({ ok: true })
  }
)

export default router
