import axios from 'axios'
// import axiosHttpAdapter from 'axios/lib/adapters/http'

import {
  getMeUrl,
  getUserUrl,
  createCommitStatusUrl,
  createIssueCommentUrl,
} from './urls'

export class GithubApi {
  constructor(log) {
    this.log = log

    const ax = axios.create({
      baseURL: 'https://api.github.com',
      timeout: 30000,
      headers: {
        'User-Agent': 'github-trigger-bot',
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    })

    this.request = ({ method, url, body, expect }) =>
      ax.request({
        method,
        url,
        data: body,
        validateStatus: s => s === expect,
        // adapter: config => {
        //   this.log.debug({ config }, 'API REQUEST')
        //   return axiosHttpAdapter(config)
        //     .then(
        //       response => {
        //         this.log.debug({
        //           response: {
        //             status: response.status,
        //             statusText: response.statusText,
        //             data: response.data,
        //           },
        //         }, 'API RESULT')
        //         return response
        //       },
        //       err => {
        //         if (err.response) {
        //           this.log.error({
        //             response: {
        //               status: err.response.status,
        //               statusText: err.response.statusText,
        //               data: err.response.data,
        //             },
        //           }, 'API ERROR')
        //         } else {
        //           this.log.error({ err }, 'API EXCEPTION')
        //         }
        //
        //         throw err
        //       }
        //     )
        // },
      })
  }

  async setCommitStatus(repo, commit, status) {
    this.log.debug('setting commit status for %s %s to %s', repo, commit, status)
    return await this.request({
      method: 'POST',
      url: createCommitStatusUrl({
        repoOwner: repo.getOwner(),
        repoName: repo.getName(),
        sha: commit.getSha(),
      }),
      body: status.toJSON(),
      expect: 201,
    })
  }

  async commentOnIssue(repo, issue, commentText) {
    this.log.debug('commenting on issue %s in repo %s', issue, repo)
    return await this.request({
      method: 'POST',
      url: createIssueCommentUrl({
        repoOwner: repo.getOwner(),
        repoName: repo.getName(),
        issueNumber: issue.getNumber(),
      }),
      body: {
        body: commentText,
      },
      expect: 201,
    })
  }

  async getPrForIssue(issue) {
    this.log.debug('getting pr for issue, %s', issue)
    return await this.request({
      method: 'GET',
      url: issue.getPullRequest().url,
      expect: 200,
    })
  }

  async getMe() {
    this.log.debug('getting server user info')
    return await this.request({
      method: 'GET',
      url: getMeUrl(),
      expect: 200,
    })
  }

  async getUser(username) {
    this.log.debug('getting user info for %s', username)
    return await this.request({
      method: 'GET',
      url: getUserUrl({ username }),
      expect: 200,
    })
  }
}
