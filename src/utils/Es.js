import { parse as parseUrl } from 'url'

import { Client } from 'elasticsearch'

export const getEs = () => new Client({
  host: {
    ...parseUrl(process.env.ES_URL),
    auth: process.env.ES_AUTH,
  },
})
