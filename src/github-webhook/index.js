import Joi from 'joi'
import bodyParser from 'body-parser'

import { validateReqMw, Router, modifyUrl, joinPathname } from '../utils'
import { initialize as initializeGithubEvent } from '../github-event'

import prs from './pull_request'
import issues from './issue_comment'

const router = new Router()

router.use(bodyParser.json({
  limit: '1mb',
}))

router.use(
  validateReqMw('headers', Joi.object({
    'x-github-delivery': Joi.string(),
    'x-github-event': Joi.string().valid('pull_request', 'issue_comment'),
  })),
  initializeGithubEvent(),
)

router.post('/', (req, res, next) => {
  req.url = modifyUrl(req.url, url => ({
    ...url,
    pathname: joinPathname(url.pathname, req.ghEvent.getType()),
  }))
  next()
})

router.use(issues)
router.use(prs)

export default router
