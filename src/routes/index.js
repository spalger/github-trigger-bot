import { Router } from 'express'
import { github } from './github'
import { assets } from './assets'

const router = new Router

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/ping', (req, res) => {
  res.send('pong')
})

router.use('/github', github)
router.use('/assets', assets)

export default router
