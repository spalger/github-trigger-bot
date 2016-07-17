import { Router } from 'express'
import githubWebhook from '../github-webhook'
import assets from './assets'

export const router = new Router

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/ping', (req, res) => {
  res.send('pong')
})

router.use('/github-webhook', githubWebhook)
router.use('/assets', assets)
