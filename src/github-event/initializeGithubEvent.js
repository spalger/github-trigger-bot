import Joi from 'joi'

import { validateReq } from '../utils'

import { GithubEvent } from './GithubEvent'

export const initializeGithubEvent = () => [
  async (req, res, next) => {
    validateReq('headers', Joi.object({
      'x-github-delivery': Joi.string(),
      'x-github-event': Joi.string().valid('pull_request', 'issue_comment'),
    }))

    req.ghEvent = new GithubEvent({
      id: req.headers['x-github-delivery'],
      type: req.headers['x-github-event'],
    })
    next()
  },
]
