import Joi from 'joi'

import { createSafeBase, getProps } from '../utils'

const schema = Joi.object().keys({
  number: Joi.number(),
  pull_request: Joi.object().optional().keys({
    url: Joi.string().uri(),
  }),
})

export class Issue extends createSafeBase(schema) {
  static fromEventData(data) {
    return new Issue(data)
  }

  hasPullRequest() {
    return !!getProps(this).pull_request
  }
}
