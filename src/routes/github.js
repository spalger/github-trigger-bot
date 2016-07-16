import Joi from 'joi'
import bodyParser from 'body-parser'

import { validate, Router, modifyUrl, joinPathname } from '../lib'

export const github = new Router()

github.use(bodyParser.json({
  limit: '1mb',
}))

github.use('/webhook',
  validate('headers', Joi.object({
    'x-github-delivery': Joi.string(),
    'x-github-event': Joi.string().valid('pull_request'),
  })),

  (req, res, next) => {
    req.ghEvent = {
      receivedAt: (new Date()).toJSON(),
      id: req.headers['x-github-delivery'],
      type: req.headers['x-github-event'],
    }
    next()
  }
)

github.post('/webhook', (req, res, next) => {
  req.url = modifyUrl(req.url, url => ({
    ...url,
    pathname: joinPathname(url.pathname, req.ghEvent.type),
  }))
  next()
})

github.post('/webhook/pull_request',
  validate('body', Joi
    .object()
    .rename('pull_request', 'pullRequest')
    .keys({
      action: Joi.string().valid('opened'),
      pullRequest: Joi.object({
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
      repository: Joi
        .object()
        .rename('full_name', 'fullName')
        .keys({
          fullName: Joi.string().description('org/project formatted name'),
        }),
    })
  ),

  async (req, res) => {
    res.json(await req.app.es.index({
      index: `gh-events-${req.ghEvent.type}`,
      type: req.ghEvent.type,
      id: req.ghEvent.id,
      body: {
        ...req.ghEvent,
        ...req.body,
      },
    }))
  }
)
