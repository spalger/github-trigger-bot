import { validate } from './validate'
import { getProps, setProps } from './propStore'
import { camelCase } from 'lodash'

export function createSafeBase(schema) {
  class SafeBaseClass {
    constructor(input) {
      setProps(this, validate(input, schema))
    }

    toJSON() {
      return getProps(this)
    }
  }

  // define getter and setter methods for each prop
  schema._inner.children.forEach(({ key }) => {
    const UpperCamel = `${key.charAt(0).toUpperCase()}${camelCase(key).slice(1)}`

    const get = `get${UpperCamel}`
    function propGetter() { return getProps(this)[key] }
    SafeBaseClass.prototype[get] = propGetter
    SafeBaseClass.prototype[get].displayName = get

    const set = `set${UpperCamel}`
    function propSetter(val) { return setProps(this, { [key]: val }) }
    SafeBaseClass.prototype[set] = propSetter
    SafeBaseClass.prototype[set].displayName = set
  })

  return SafeBaseClass
}
