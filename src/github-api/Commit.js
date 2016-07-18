import Joi from 'joi'

import { createSafeBase, getProps } from '../utils'

const schema = Joi.object().keys({
  sha: Joi.string(),
})

export class Commit extends createSafeBase(schema) {
  toString() {
    const { sha } = getProps(this)
    return `sha:${sha.slice(0, 6)}`
  }
}
