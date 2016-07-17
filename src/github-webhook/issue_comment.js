import Joi from 'joi'

import { Router } from '../utils'

import { validateEventData } from '../github-event'

const router = new Router()

router.post('/issue_comment',
  validateEventData(Joi.object({
    action: Joi.string().valid('created'),
    issue: Joi.object({
      url: Joi.string().uri().description('api url'),
      id: Joi.number().description('api/object id'),
      number: Joi.number().description('repo-relative number'),
      created_at: Joi.date().iso(),
      state: Joi.string().valid('open', 'closed'),
      user: Joi.object({
        login: Joi.string().description('username'),
        url: Joi.string().uri().description('api url'),
      }),
      pull_request: Joi
        .object()
        .description('pull request for the issue')
        .keys({
          url: Joi.string().uri(),
        })
        .optional(),
    }),
    comment: Joi.object({
      url: Joi.string().uri(),
      id: Joi.number(),
      user: Joi.object({
        login: Joi.string().description('commenter username'),
        id: Joi.number(),
        url: Joi.string().uri(),
      }),
      created_at: Joi.date().iso(),
      body: Joi.string(),
    }),
    repository: Joi.object({
      full_name: Joi.string().description('org/project formatted name'),
    }),
  })),

  async (req, res) => {
    res.json({ ok: true })
  }
)

export default router