import Joi from 'joi'
import Boom from 'boom'
import { fromCallback as fcb } from 'bluebird'

export const validate = async (req, which, schema) => {
  try {
    const input = req[which]
    const options = {
      abortEarly: false,
      convert: true,
      allowUnknown: true,
      presence: 'required',
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

    return valid
  } catch (err) {
    throw Boom.wrap(err, 406) // not acceptable
  }
}

export const validateMw = (which, schema) => async (req, res, next) => {
  await validate(req, which, schema)
  next()
}
