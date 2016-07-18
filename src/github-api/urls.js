const parse = pattern => {
  const parts = pattern.split(/[\{\}]/)
  return (vals) => parts.reduce((acc, seg, i) => {
    if (i % 2 === 0) {
      // every even part is just text
      return acc + seg
    }

    const optional = seg.endsWith('?')
    const name = optional ? seg.slice(0, -1) : seg

    const val = vals[name]
    if (val == null) {
      if (!optional) {
        throw new Error(`Missing template variable "${seg}"`)
      }
    } else {
      return acc + val
    }

    return acc
  })
}

export const createCommitStatusUrl =
  parse('/repos/{repoOwner}/{repoName}/statuses/{sha}')

export const createIssueCommentUrl =
  parse('/repos/{repoOwner}/{repoName}/issues/{issueNumber}/comments')

export const getMeUrl =
  parse('/user')

export const getUserUrl =
  parse('/users/{username}')
