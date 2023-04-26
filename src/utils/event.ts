import { symbol } from './symbol'
/**
 * Event Bus
 * 事件总线
 *
 * @example
 * // 注册事件
 * $event.on('eventName', this, function(payload) {})
 *
 * // 触发事件
 * $event.emit('eventName', { id: 1 })
 *
 * // 注销事件
 * $event.off('eventName', this)
 */

export class EventBus {
  private events: IAnyObject = {}

  /**
   * 注册事件
   * @example
   * $event.on('eventName', this, function(payload) { console.log(payload) })
   */
  public on(eventName: string, self: Instance, handler: EventHandler, opts?: Opts): void {
    const cache = this.events[eventName] || (this.events[eventName] = {})
    let key = `${self.is || self.__route__!}`

    if (opts && opts.multiple === true) {
      if (opts.key) {
        key += '__' + opts.key
      }
      key = symbol(key)
    }
    cache[key] = handler
  }

  /**
   * 触发事件
   * @example
   * $event.emit('eventName', { id: 1 })
   */
  public emit(eventName: string, payload?: unknown): void {
    const cache = this.events[eventName]
    if (!cache) {
      return
    }

    const keys = typeof Reflect !== 'undefined' ? Reflect.ownKeys(cache) : Object.keys(cache)

    keys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(cache, key)) {
        cache[key].call(this, payload)
      }
    })
  }

  /**
   * 注销事件
   * @example
   * $event.off('eventName', this)
   */
  public off(eventName: string, self: Instance, opts?: { key?: string }): void {
    const path = self.is || self.__route__!
    const cache = this.events[eventName] || {}
    const keys = Reflect ? Reflect.ownKeys(cache) : Object.keys(cache)
    const checkKey = (key: any, checkData: string) => {
      if (opts && opts.key) {
        checkData += '__' + opts.key
      }
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      if (typeof (<SymbolConstructor>key) === 'symbol') {
        return key.description === checkData
      }
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return <string>key.startsWith(`__${checkData}`)
    }

    // eslint-disable-next-line @typescript-eslint/no-for-in-array
    for (const i in keys) {
      const key = keys[i]

      if (key === path || checkKey(key, path)) {
        delete cache[key]
      }
    }
  }
}

/** 事件处理函数 */
type EventHandler = (...rest: any) => void

type Instance = (WxComponent<any, any, any> | Page.PageInstance<any> | {}) & {
  /** 页面路由(组件) */
  is?: string
  /** 页面路由(页面) */
  __route__?: string
}

type Opts = {
  multiple?: boolean
  // 区别的事件key
  key?: string
}
