const parse = pattern => {
  const parts = pattern.split(/[\{\}]/)
  return (vals) => parts.reduce((acc, seg, i) => {
    if (i % 2) {
      const val = vals[seg]
      if (val == null) {
        throw new Error(`Missing template variable "${seg}"`)
      }
      // every odd part is a key name
      return acc + val
    }

    return acc + seg
  })
}

export const createCommitStatusUrl =
  parse('/repos/{repoOwner}/{repoName}/statuses/{sha}')

export const createIssueCommentUrl =
  parse('/repos/{repoOwner}/{repoName}/issues/{issueNumber}/comments')
