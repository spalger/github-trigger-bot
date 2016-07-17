import { GithubEvent } from './GithubEvent'

export const initialize = () =>
  (req, res, next) => {
    req.ghEvent = new GithubEvent({
      id: req.headers['x-github-delivery'],
      type: req.headers['x-github-event'],
    })
    next()
  }
