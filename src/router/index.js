import { Router } from 'express'
import { ghWebhook } from '../gh-webhook'
import { assets } from './assets'

export const router = new Router

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/ping', (req, res) => {
  res.send('pong')
})

router.use('/gh-webhook', ghWebhook)
router.use('/assets', assets)
