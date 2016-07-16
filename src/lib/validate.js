import Joi from 'joi'
import Boom from 'boom'
import { fromCallback as fcb } from 'bluebird'

export const validate = (which, schema) => async (req, res, next) => {
  try {
    const input = req[which]
    const options = {
      abortEarly: false,
      convert: true,
      allowUnknown: true,
      presence: 'required',
      context: req.locals,
      stripUnknown: {
        objects: true,
        arrays: false,
      },
    }

    const valid = await fcb(cb => Joi.validate(input, schema, options, cb))
    if (which === 'headers') {
      Object.assign(req.headers, valid)
    } else {
      req[which] = valid
    }
  } catch (err) {
    throw Boom.wrap(err, 406) // not acceptable
  }

  next()
}
