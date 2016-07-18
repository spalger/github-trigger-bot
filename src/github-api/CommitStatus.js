import Joi from 'joi'

import { createSafeBase } from '../utils'

const schema = Joi.object().keys({
  state: Joi.string().valid('pending', 'success', 'error', 'failure'),
  target_url: Joi.string().uri(),
  description: Joi.string(),
  context: Joi.string().default('default'),
})

export class CommitStatus extends createSafeBase(schema) {}
