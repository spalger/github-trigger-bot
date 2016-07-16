import Boom from 'boom'
import { red } from 'chalk'

export const errorHandler = () => [
  (_, req, res, next) => {
    const err = _ && _.isBoom ? _ : Boom.wrap(_)
    const { payload, headers, statusCode } = err.output

    console.error(red('ERROR:'), err.stack)

    res
      .status(statusCode)
      .set(headers)
      .send(payload)
  },
]
