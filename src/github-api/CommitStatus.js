import Joi from 'joi'

import { createSafeBase, getProps } from '../utils'

const schema = Joi.object().keys({
  state: Joi.string().valid('pending', 'success', 'error', 'failure'),
  target_url: Joi.string().uri(),
  description: Joi.string(),
  context: Joi.string().default('default'),
})

export class CommitStatus extends createSafeBase(schema) {
  toString() {
    const { state, description } = getProps(this)
    return `${state}: ${description}`
  }
}
