import { getProps, setProps } from '../utils'

export class GithubEvent {
  constructor({ id, type } = {}) {
    setProps(this, {
      id,
      type,
      receivedAt: new Date(),
      data: undefined,
    })
  }

  getType() {
    return getProps(this).type
  }

  getEsLocation() {
    const { type, id } = getProps(this)
    return { id, type, index: `gh-events-${type}` }
  }

  setData(data) {
    setProps(this, { data })
  }

  getEsDocument() {
    const { index, type, id, receivedAt, data = {} } = getProps(this)
    return { index, type, id, receivedAt, ...data }
  }

  toJSON() {
    return this.getEsDocument()
  }
}
