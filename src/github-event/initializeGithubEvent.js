import { createHmac } from 'crypto'

import Boom from 'boom'
import Joi from 'joi'
import { validateReq } from '../utils'

import { GithubEvent } from './GithubEvent'

const { GITHUB_WEBHOOK_SECRET } = process.env
if (!GITHUB_WEBHOOK_SECRET) {
  throw new Error('You must specify the GITHUB_WEBHOOK_SECRET configuration/environment variable')
}

export const initializeGithubEvent = () => [
  async (req, res, next) => {
    validateReq('headers', Joi.object({
      'x-github-delivery': Joi.string(),
      'x-github-event': Joi.string().valid('pull_request', 'issue_comment'),
      'x-hub-signature': Joi.string(),
    }))

    const [algo, signature] = req.headers['x-hub-signature'].split('=')
    if (algo !== 'sha1') {
      throw Boom.notAcceptable(`expected signature to be computed with sha1, got ${algo}`)
    }

    const hmac = createHmac(algo, GITHUB_WEBHOOK_SECRET)
    const hash = hmac.update(req.rawBody).digest('hex')
    if (hash !== signature) throw Boom.notAcceptable('signature mismatch')

    req.ghEvent = new GithubEvent({
      id: req.headers['x-github-delivery'],
      type: req.headers['x-github-event'],
    })
    next()
  },
]
