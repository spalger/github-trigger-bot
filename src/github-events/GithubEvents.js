
import { getProps, setProps } from '../utils'

export class GithubEvents {
  constructor(es, io) {
    const latest = []
    const room = io.of('/github-events')
    setProps(this, { es, io, latest, room })
  }

  setupRoomConnectionListener() {
    const { room } = getProps(this)

    room.on('connection', socket => {
      getProps(this).latest.forEach(event => {
        socket.emit('created', event)
      })
    })
  }

  onEventCreated(event) {
    const { latest, room } = getProps(this)

    latest.push(event)
    if (latest.length > 10) latest.shift()

    room.emit('created', event.toJSON())
  }
}
