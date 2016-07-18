import { validateReq } from '../utils'

export const validateEventData = schema => async (req, res, next) => {
  const { es, ghEvents, log } = req.app
  const { ghEvent } = req

  log.debug('setting validated event data to ghEvent object')
  ghEvent.setData(validateReq(req, 'body', schema))
  const { index, type, id } = ghEvent.getEsLocation()

  log.debug('saving ghEvent to elasticsearch')
  await es.index({
    index,
    type,
    id,
    body: ghEvent.getEsDocument(),
  })

  log.debug('notifying event channel about event creation')
  ghEvents.onEventCreated(ghEvent)

  log.debug('handing control back to route')
  next()
}
