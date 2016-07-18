/* eslint-env mocha */
import Joi from 'joi'
import { expect } from 'chai'

import { getProps } from '../propStore'
import { createSafeBase } from '../SafeBase'

describe('SafeBase class creator', () => {
  it('creates a base class to extend that applies and verifies a schema', () => {
    const SafeBase = createSafeBase(Joi.object({
      a: Joi.string(),
      b: Joi.string().default('b').optional(),
    }))

    class SubClass extends SafeBase {}
    const o = new SubClass({
      a: 'john',
    })

    expect(getProps(o)).to.eql({ a: 'john', b: 'b' })
  })
})
