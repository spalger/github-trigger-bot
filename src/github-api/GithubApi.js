import axios from 'axios'

import { createCommitStatusUrl, createIssueCommentUrl } from './urls'

export class GithubApi {
  constructor(log) {
    this.log = log
    this.api = axios.create({
      baseURL: 'https://api.github.com',
      timeout: 30000,
      headers: {
        'User-Agent': 'github-trigger-bot',
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    })
  }

  async setCommitStatus(repo, commit, status) {
    this.log.debug('setting commit status for %s %s to %s', repo, commit, status)
    return await this.api.request({
      method: 'POST',
      url: createCommitStatusUrl.expand({
        owner: repo.getOwner(),
        repo: repo.getName(),
        sha: commit.getSha(),
      }),
      data: status.toJSON(),
      validateStatus: s => s === 201,
    })
  }

  async commentOnIssue(repo, issue, commentText) {
    this.log.debug('commenting on issue %s in repo %s', issue, repo)
    return await this.api.request({
      method: 'POST',
      url: createIssueCommentUrl.expand({
        owner: repo.getOwner(),
        repo: repo.getName(),
        issueNumber: issue.getNumber(),
      }),
      data: {
        body: commentText,
      },
      validateStatus: s => s === 201,
    })
  }

  async getPrForIssue(issue) {
    this.log.debug('getting pr for issue, %s', issue)
    return await this.api.request({
      method: 'GET',
      url: issue.getPullRequest().url,
      validateStatus: s => s === 200,
    })
  }
}
