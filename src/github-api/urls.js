import urlTemplate from 'url-template'

const parse = str => {
  const parsed = urlTemplate.parse(str)
  return (vals) => parsed.expand(vals)
}

export const createCommitStatusUrl =
  parse('/repos/{repoOwner}/{repoName}/statuses/{sha}')

export const createIssueCommentUrl =
  parse('/repos/{repoOwner}/{repoName}/issues/{issueNumber}/comments')
