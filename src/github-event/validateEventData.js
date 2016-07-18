import { validate } from '../utils'

export const validateEventData = schema => async (req, res, next) => {
  const { es, events, log } = req.app
  const { ghEvent } = req

  log.debug('setting validated event data to ghEvent object')
  ghEvent.setData(await validate(req, 'body', schema))
  const { index, type, id } = ghEvent.getEsLocation()

  log.debug('saving ghEvent to elasticsearch')
  await es.index({
    index,
    type,
    id,
    body: ghEvent.getEsDocument(),
  })

  log.debug('notifying event channel about event creation')
  events.onEventCreated(ghEvent)

  log.debug('handing control back to route')
  next()
}
