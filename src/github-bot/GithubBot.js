import Joi from 'joi'

import { getProps, setProps, validate } from '../utils'

export class GithubBot {
  constructor(log, ghApi) {
    setProps(this, {
      log,
      ghApi,
    })
  }

  async init() {
    const { ghApi } = getProps(this)
    const { data: userData } = await ghApi.getMe()
    this.setUserData(userData)
  }

  setUserData(data) {
    const { log } = getProps(this)
    setProps(this, {
      user: validate(data, Joi.object().keys({
        login: Joi.string().description('username'),
        name: Joi.string().description('Human-friendly name'),
        url: Joi.string().uri(),
        avatar_url: Joi.string().uri(),
      })),
    })

    log.info({ user: this.getUserData() }, 'initialized github bot with user')
  }

  getUserData() {
    return getProps(this).user
  }

  getUsername() {
    return getProps(this).user.login
  }
}
