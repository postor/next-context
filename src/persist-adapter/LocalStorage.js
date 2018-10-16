import PersistAdapter from './PersistAdapter'
import isServer from './is-server'
const PRIFIX = 'PersistAdapter_'

export class LocalStorage extends PersistAdapter {
  constructor(key) {
    this.key = `${PRIFIX}${key}`
  }

  set(item = {}) {
    if (isServer) {
      this.item = item
      return
    }
    return localStorage.setItem(this.key, JSON.stringify(item))
  }

  get() {
    if (isServer) {
      return this.item
    }
    return JSON.parse(localStorage.getItem(this.key))
  }

  clean() {
    if (isServer) {
      this.item = undefined
    }
    localStorage.removeItem(this.key)
  }

}