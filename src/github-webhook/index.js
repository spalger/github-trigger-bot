import bodyParser from 'body-parser'

import { Router, modifyUrl, joinPathname } from '../utils'
import { initializeGithubEvent } from '../github-event'

import prs from './pull_request'
import issues from './issue_comment'

const router = new Router()

// buffer the body as long as it is less than 1mb
router.use(bodyParser.raw({
  limit: '1mb',
}))

// json parse the body
router.use((req, res, next) => {
  req.rawBody = req.body
  req.body = JSON.parse(req.rawBody.toString('utf8'))
  next()
})

// create the req.ghEvent object
router.use(initializeGithubEvent())

// internal "redirect" to appropariate route based on event type
router.post('/', (req, res, next) => {
  req.url = modifyUrl(req.url, url => ({
    ...url,
    pathname: joinPathname(url.pathname, req.ghEvent.getType()),
  }))
  next()
})

// event type route handlers
router.use(issues)
router.use(prs)

export default router
