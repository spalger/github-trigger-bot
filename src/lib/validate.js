import Joi from 'joi'
import Boom from 'boom'
import { fromCallback as fcb } from 'bluebird'

export const validate = (which, schema) => async cntx => {
  try {
    const input = cntx.request[which]
    const options = {
      abortEarly: false,
      convert: true,
      allowUnknown: true,
      presence: 'required',
      context: cntx,
      stripUnknown: {
        objects: true,
        arrays: false,
      },
    }
    cntx.request[which] = await fcb(cb => Joi.validate(input, schema, options, cb))
  } catch (err) {
    throw Boom.wrap(err, 406) // not acceptable
  }
}
