import { fromCallback as fcb } from 'bluebird'

import { validate } from '../utils'

export const validateEventData = schema => {
  const validateMiddleware = validate('body', schema)
  return async (req, res, next) => {
    await fcb(cb => validateMiddleware(req, res, cb))

    const { ghEvent } = req
    const { es } = req.app

    ghEvent.setData(req.body)
    const { index, type, id } = ghEvent.getEsLocation()
    await es.index({
      index, type, id,
      body: ghEvent.getEsDocument(),
    })

    next()
  }
}
