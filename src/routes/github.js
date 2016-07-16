import Joi from 'joi'
import bodyParser from 'body-parser'

import { validate, Router } from '../lib'

export const github = new Router()

github.use(bodyParser.json({
  limit: '1mb',
}))

github.post('/webhook',
  validate('headers', Joi.object({
    'x-github-delivery': Joi.string(),
  })),

  validate('body', Joi.object({
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
    repository: Joi.object({
      full_name: Joi.string().description('org/project formatted name'),
    }),
  })),

  async (req, res) => {
    res.json(await req.app.es.index({
      index: 'hooks',
      type: 'hook',
      id: req.headers['x-github-delivery'],
      body: req.body,
    }))
  }
)
