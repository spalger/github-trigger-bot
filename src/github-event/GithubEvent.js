import { props } from '../utils'

export class GithubEvent {
  constructor({ id, type } = {}) {
    props(this, {
      id,
      type,
      index: `gh-events-${type}`,
      receivedAt: new Date(),
      data: undefined,
    })

    console.log('created event with props %j', props(this))
  }

  getType() {
    return props(this).type
  }

  getEsLocation() {
    const { index, type, id } = props(this)
    return { index, type, id }
  }

  setData(data) {
    props(this, { data })
  }

  getEsDocument() {
    const { index, type, id, receivedAt, data = {} } = props(this)
    return { index, type, id, receivedAt, ...data }
  }
}
