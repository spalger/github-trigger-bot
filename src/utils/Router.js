import express from 'express'
import { attempt } from 'bluebird'

export function Router() {
  const router = new express.Router

  function asyncHandler(handler) {
    return (req, res, next) => {
      attempt(() => handler(req, res, next)).catch(next)
    }
  }

  function wrap(method) {
    const orig = router[method]
    router[method] = (...args) => orig.apply(
      router,
      args.map(a => (
        typeof a === 'function'
          ? asyncHandler(a)
          : a
      ))
    )
  }

  wrap('use')
  wrap('get')
  wrap('post')

  return router
}
