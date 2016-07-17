const store = new WeakMap()

export const props = (inst, vals) => {
  const p = store.get(inst) || {}

  if (typeof vals === 'object') {
    Object.assign(p, vals)
    store.set(inst, p)
  } else if (vals !== undefined) {
    throw new TypeError('vals should be an object or undefined')
  }

  return p
}
