import Boom from 'boom'
import { red } from 'chalk'

export const errorHandler = () => async (ctx, next) => {
  try {
    await next() // next is now a function
  } catch (_) {
    const err = _ && _.isBoom ? _ : Boom.wrap(_)
    const { payload, headers, statusCode } = err.output

    console.error(red('ERROR:'), err.stack)

    ctx.response.status = statusCode
    Object.assign(ctx.response.headers, headers)
    ctx.response.body = payload
  }
}
