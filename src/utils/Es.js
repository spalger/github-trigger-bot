import { parse as parseUrl } from 'url'

import { Client } from 'elasticsearch'

const { ES_URL, ES_AUTH } = process.env
if (!ES_URL || !ES_AUTH) {
  throw new TypeError('You must specify both ES_URL and ES_AUTH configuration/environment vars')
}

export const getEs = () => new Client({
  host: {
    ...parseUrl(ES_URL),
    auth: ES_AUTH,
  },
})
