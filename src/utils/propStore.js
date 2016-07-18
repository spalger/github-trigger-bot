
const PROPS_KEY = Symbol('props')

export const getProps = (inst) => inst[PROPS_KEY]
export const setProps = (inst, vals) => {
  if (typeof vals === 'object') {
    inst[PROPS_KEY] = Object.assign(inst[PROPS_KEY] || {}, vals)
  } else {
    throw new TypeError('only call setProps with an object')
  }
}
