import { resolve } from 'path'

import express from 'express'

import githubWebhook from '../github-webhook'
import assets from '../assets'

export const router = new express.Router

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/ping', (req, res) => {
  res.send('pong')
})

router.use('/github-webhook', githubWebhook)
router.use('/assets', assets)

router.use(express.static(resolve(__dirname, '../public')))
