import Joi from 'joi'
import Boom from 'boom'

export const joiOpts = {
  abortEarly: false,
  convert: true,
  allowUnknown: true,
  presence: 'required',
  stripUnknown: {
    objects: true,
    arrays: false,
  },
}

export const validate = (val, schema) => {
  const resp = Joi.validate(val, schema, joiOpts)

  if (resp.error) {
    throw resp.error
  } else {
    return resp.value
  }
}

export const validateReq = (req, which, schema) => {
  try {
    const input = req[which]
    const valid = validate(input, schema)
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

export const validateReqMw = (which, schema) => (req, res, next) => {
  validateReq(req, which, schema)
  next()
}
