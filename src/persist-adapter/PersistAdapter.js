import isServer from './is-server'
const PRIFIX = 'PersistAdapter_'

export default class PersistAdapter {
  key
  item
  
  constructor(key) {
    this.key = `${PRIFIX}${key}`
  }

  set(item = {}) {
    if (isServer) {
      this.item = item
      return
    }
    return window[this.key] = item
  }

  get() {
    if (isServer) {
      return this.item
    }
    return window[this.key]
  }

  clean() {
    if (isServer) {
      this.item = undefined
    }
    window[this.key] = undefined
  }

}