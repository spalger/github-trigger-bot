import { parse as parseUrl, format as formatUrl } from 'url'
import { trimStart, trimEnd } from 'lodash'

export const modifyUrl = (url, block) => {
  const { protocol, hostname, port, pathname, query, hash } = parseUrl(url, true)
  return formatUrl(block({ protocol, hostname, port, pathname, query, hash }))
}

export const joinPathname = (...parts) => parts.reduce(
  (acc, seg) =>
    `${trimEnd(acc, '/')}/${trimStart(seg, '/')}`,
  '/'
)
