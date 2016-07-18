import Joi from 'joi'

import { createSafeBase } from '../utils'

const schema = Joi.object().keys({
  sha: Joi.string(),
})

export class Commit extends createSafeBase(schema) {}
