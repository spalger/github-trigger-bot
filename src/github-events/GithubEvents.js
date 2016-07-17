export class GithubEvents {
  constructor(es, io) {
    this.es = es
    this.io = io

    this.latest = []
    this.room = this.io.of('/github-events')

    this.room.on('connection', socket => {
      // send the last 10 events to new viewers on connection
      for (let i = this.latest.length; i >= 0; i--) {
        const event = this.latest[i]
        if (event) socket.emit('created', event)
      }
    })
  }

  onEventCreated(event) {
    this.latest.unshift(event)
    if (this.latest.length > 10) this.latest.length = 10

    this.room.emit('created', event.toJSON())
  }
}
