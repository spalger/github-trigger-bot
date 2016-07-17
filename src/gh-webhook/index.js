import Joi from 'joi'
import bodyParser from 'body-parser'

import { validate, Router, modifyUrl, joinPathname } from '../utils'
import prs from './pull_request'
import issues from './issue_comment'

export const ghWebhook = new Router()

ghWebhook.use(bodyParser.json({
  limit: '1mb',
}))

ghWebhook.use(
  validate('headers', Joi.object({
    'x-github-delivery': Joi.string(),
    'x-github-event': Joi.string().valid('pull_request', 'issue_comment'),
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

ghWebhook.post('/', (req, res, next) => {
  req.url = modifyUrl(req.url, url => ({
    ...url,
    pathname: joinPathname(url.pathname, req.ghEvent.type),
  }))
  next()
})

ghWebhook.use(issues)
ghWebhook.use(prs)
