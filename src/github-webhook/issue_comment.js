import Joi from 'joi'

import { Router } from '../utils'
import { Repo, Issue, Commit, CommitStatus } from '../github-api'
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
      name: Joi.string(),
      full_name: Joi.string().description('owner/name formatted name'),
      owner: Joi.object().keys({
        login: Joi.string(),
      }),
    }),
  })),

  async (req, res) => {
    const { ghApi } = req.app
    const d = req.body

    const repo = Repo.fromEventData(d.repository)
    const issue = Issue.fromEventData(d.issue)

    if (issue.hasPullRequest()) {
      const { data: pr } = await ghApi.getPrForIssue(issue)

      ghApi.setCommitStatus(
        repo,
        new Commit({
          sha: pr.head.sha,
        }),
        new CommitStatus({
          state: 'pending',
          target_url: 'https://github.com',
          description: 'Received issue comment webhook',
        })
      )
    } else {
      ghApi.commentOnIssue(repo, issue, 'Does not look like this is a pull request')
    }

    res.json({ ok: true })
  }
)

export default router
