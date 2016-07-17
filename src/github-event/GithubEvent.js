import { props } from '../utils'

export class GithubEvent {
  constructor({ id, type } = {}) {
    props(this, {
      id,
      type,
      receivedAt: new Date(),
      data: undefined,
    })
  }

  getType() {
    return props(this).type
  }

  getEsLocation() {
    const { type, id } = props(this)
    return { id, type, index: `gh-events-${type}` }
  }

  setData(data) {
    props(this, { data })
  }

  getEsDocument() {
    const { index, type, id, receivedAt, data = {} } = props(this)
    return { index, type, id, receivedAt, ...data }
  }

  toJSON() {
    return this.getEsDocument()
  }
}
