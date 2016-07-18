import Joi from 'joi'

import { createSafeBase } from '../utils'

const schema = Joi.object().keys({
  owner: Joi.string(),
  name: Joi.string(),
})

export class Repo extends createSafeBase(schema) {
  static fromEventData(data) {
    return new Repo({
      owner: data.owner.login,
      name: data.name,
    })
  }
}
